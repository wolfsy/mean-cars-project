import * as mongodb from "mongodb";
import { Car } from "./models/car";
import { Users } from "./models/users";
import { Subsidiary } from "./models/subsidiary";
import { RefreshToken } from "./models/refreshToken";

export const collections: {
    subsidiaries?: mongodb.Collection<Subsidiary>;
    users?: mongodb.Collection<Users>;
    cars?: mongodb.Collection<Car>;
    refreshTokens?: mongodb.Collection<RefreshToken>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("database");
    await applySchemaValidation(db);

    const subsidiariesCollection = db.collection<Subsidiary>("subsidiaries");
    collections.subsidiaries = subsidiariesCollection;

    const usersCollection = db.collection<Users>("users");
    collections.users = usersCollection;

    const carsCollection = db.collection<Car>("cars");
    collections.cars = carsCollection;

    const refreshTokensCollection = db.collection<RefreshToken>("refreshTokens");
    collections.refreshTokens = refreshTokensCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Car model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {

    const jsonSchemaSubsidiaries = {
        $jsonSchema: {
            bsonType: "object",
            required: ["manager", "address", "phoneNumber", "emailAddress"],
            additionalProperties: false,
            properties: {
                _id: {},
                manager: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'manager' is required, not unique and is a string",
                    minLength: 128
                },
                address: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'address' is required, not unique and is a string",
                    minLength: 128
                },
                phoneNumber: {
                    bsonType: "string",
                    required: true,
                    unique: true,
                    description: "'phoneNumber' is required, unique and is a string",
                    minLength: 128
                },
                emailAddress: {
                    bsonType: "string",
                    required: true,
                    unique: true,
                    description: "'emailAddress' is required, unique and is a number",
                    minLength: 128
                }
            }
        }
    };

    const jsonSchemaCars = {
        $jsonSchema: {
            bsonType: "object",
            required: ["vin", "brand", "model", "year_of_production", "task_type", "description", "status"],
            additionalProperties: false,
            properties: {
                _id: {},
                vin: {
                    bsonType: "string",
                    required: true,
                    unique: true,
                    description: "'vin' is required, unique and is a string"
                },
                brand: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'brand' is required, not unique and is a string",
                    maxLength: 128
                },
                model: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'model' is required, not unique and is a string",
                    maxLength: 128
                },
                year_of_production: {
                    bsonType: "Number",
                    required: true,
                    unique: false,
                    validator: {
                        validate: Number.isInteger,
                        message: "{VALUE} is not an integer value"
                    }
                },
                task_type: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'task_type' is required, not unique and is one of 'Repairing', 'Varnishing' or 'Cleaning'",
                    enum: ["Repairing", "Varnishing", "Cleaning"],
                },
                description: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'description' is required, not unique and is a string",
                    maxLength: 512
                },
                status: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'status' is required, not unique and is one of 'Pending', 'Servicing' or 'Finished'",
                    enum: ["Pending", "Servicing", "Finished"],
                }
            },
        },
    };

    const jsonSchemaUsers = {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "emailAddress", "phoneNumber", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                firstName: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'firstName' is required, not unique and is a string",
                    minLength: 128
                },
                lastName: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'lastName' is required, not unique and is a string",
                    minLength: 128
                },
                emailAddress: {
                    bsonType: "string",
                    required: true,
                    unique: true,
                    description: "'emailAddress' is required, unique and is a string",
                    minLength: 128
                },
                phoneNumber: {
                    bsonType: "number",
                    required: true,
                    unique: true,
                    description: "'phoneNumber' is required, unique and is a number"
                },
                password: {
                    bsonType: "string",
                    required: true,
                    unique: false,
                    description: "'password' is required, not unique and is a string",
                    minLength: 128
                }
            }
        }
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "subsidiaries",
        validator: jsonSchemaUsers
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("subsidiaries", { validator: jsonSchemaUsers });
        }
    });

    await db.command({
        collMod: "users",
        validator: jsonSchemaUsers
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", { validator: jsonSchemaUsers });
        }
    });

    await db.command({
        collMod: "cars",
        validator: jsonSchemaCars
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("cars", { validator: jsonSchemaCars });
        }
    });
}
