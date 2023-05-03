import * as mongodb from "mongodb";
import bcrypt from "bcrypt";
import { Car } from "../models/car";

export interface Users {
    _id?: mongodb.ObjectId;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: number;
    password: string;
    cars?: Car[]
    validatePassword(password: string): Promise<boolean>;
}

export class UserModel implements Users {
    _id?: mongodb.ObjectId;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: number;
    password: string;
    cars?: Car[]

    constructor(user: Users) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.emailAddress = user.emailAddress;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password;
        this.cars = user.cars || [];
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
