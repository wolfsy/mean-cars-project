import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const carRouter = express.Router();
carRouter.use(express.json());

// Returns list of cars included to collection
carRouter.get("/", async (_req, res) => {
    try {
        const cars = await collections.cars.find({}).toArray();
        res.status(200).send(cars);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Returns single car object based on passed ID value
carRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const car = await collections.cars.findOne(query);

        if (car) {
            res.status(200).send(car);
        } else {
            res.status(404).send(`Failed to find the car: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find the car: ID ${req?.params?.id}`);
    }
});

// Returns proper code due to object creation or the failure
carRouter.post("/", async (req, res) => {
    try {
        const car = req.body;
        const result = await collections.cars.insertOne(car);

        if (result.acknowledged) {
            res.status(201).send(`Created a new car instance: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new car instance.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Returns proper code depending on updation success or failure
carRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const car = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.cars.updateOne(query, { $set: car });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated the car object: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find the car object: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update the car object: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Returns proper code depending on removal success or failure
carRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.cars.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed the cars object: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove the car object: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find the car object: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
