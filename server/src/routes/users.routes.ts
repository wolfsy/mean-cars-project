import * as express from "express";
import bcrypt from "bcrypt";
import { collections } from "../database";
import { UserModel } from "../models/users";
import { RefreshToken } from "../models/refreshToken";
import { ObjectId } from 'mongodb';

export const usersRouter = express.Router();
usersRouter.use(express.json());

const jwt = require('jsonwebtoken');

usersRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, phoneNumber, password } = req.body;

        const userExistsCheck = await collections.users.findOne({ emailAddress });
        if (userExistsCheck) {
            return res.status(403).json({
                error: 'User with given email address already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            validatePassword: async function (password: string): Promise<boolean> {
                return await bcrypt.compare(password, this.password);
            }
        });

        const savedUser = await collections.users.insertOne(newUser);
        res.json({ message: 'User has been registered successfully: ', user: savedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
})

usersRouter.post("/login", async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        const userCheck = await collections.users.findOne({ emailAddress });

        if (!userCheck) {
            return res.status(401).json({ error: "User not found." });
        }

        const user = new UserModel(userCheck);
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const secret = process.env.JWT_SECRET;
        const userId = userCheck._id;

        const token = jwt.sign({ sub: userId.toHexString() }, secret, { expiresIn: '15m' });
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        const refreshToken: RefreshToken = {
            userId,
            token,
            expiresAt,
            createdByIp: req.ip,
        };

        await collections.refreshTokens.insertOne(refreshToken);

        const accessToken = jwt.sign({ sub: userId.toHexString() }, secret, { expiresIn: '5m' });
        const responseBody = { message: 'User has been logged in successfully.', accessToken, refreshToken };
        res.cookie('refreshToken', refreshToken.token, { httpOnly: true });
        res.json(responseBody);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

usersRouter.get('/session', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as any;
        const user = await collections.users.findOne({ _id: new ObjectId(decodedToken.sub) });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
});

usersRouter.post("/logout", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token missing." });
        }

        const decodedToken = jwt.decode(refreshToken, { complete: true });
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token." });
        }

        const token = await collections.refreshTokens.findOne({ token: refreshToken });
        if (!token) {
            return res.status(404).json({ error: "Token not found." });
        }

        await collections.refreshTokens.deleteOne({ token: refreshToken });
        res.clearCookie("refreshToken").send("User has been logged out successfully.");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

usersRouter.post("/change-password", async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = jwt.verify(refreshToken, process.env.JWT_SECRET).sub;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await collections.users.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const userModel = new UserModel(user);
        const isValidPassword = await userModel.validatePassword(oldPassword);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await collections.users.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

        res.json({ message: "Password has been changed successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});