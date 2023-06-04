import * as mongodb from "mongodb";
import { Users } from "../_model/users";

export interface Subsidiary {
    _id?: mongodb.ObjectId;
    manager: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    users?: Users[];
}
