import * as mongodb from "mongodb";

export interface Car {
    _id?: mongodb.ObjectId;
    vin: string;
    brand: string;
    model: string;
    year_of_production: Number;
    task_type: "Repairing" | "Varnishing" | "Cleaning" | "Other";
    description: string;
    status: "Pending" | "Servicing" | "Finished" | "Postponed";
}
