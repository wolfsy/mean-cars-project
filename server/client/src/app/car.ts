import * as mongodb from "mongodb";

export interface Car {
    _id?: mongodb.ObjectId;
    vin: string;
    brand: string;
    model: string;
    year_of_production: Number;
    task_type: "Repairing" | "Varnishing" | "Cleaning";
    description: string;
    status: "Pending" | "Servicing" | "Finished";
}
