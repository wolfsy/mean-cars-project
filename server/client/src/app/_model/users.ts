import * as mongodb from "mongodb";
import { Car } from "../_model/car";

export interface Users {
    _id?: mongodb.ObjectId;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    cars?: Car[]
}