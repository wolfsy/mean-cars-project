import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const subsidiaryRouter = express.Router();
subsidiaryRouter.use(express.json());

// Returns list of subsidiaries included to collection
subsidiaryRouter.get("/", async (_req, res) => {
    try {
        const subsidiaries = await collections.subsidiaries.find({}).toArray();
        res.status(200).send(subsidiaries);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Returns single subsidiary object based on passed ID value
subsidiaryRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const subsidiary = await collections.subsidiaries.findOne(query);

        if (subsidiary) {
            res.status(200).send(subsidiary);
        } else {
            res.status(404).send(`Failed to find the subsidiary: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find the subsidiary: ID ${req?.params?.id}`);
    }
});

// Returns proper code due to object creation or the failure
subsidiaryRouter.post("/", async (req, res) => {
    try {
        const subsidiary = req.body;
        const result = await collections.subsidiaries.insertOne(subsidiary);

        if (result.acknowledged) {
            res.status(201).send(`Created a new subsidiary instance: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new subsidiary instance.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Returns proper code depending on updation success or failure
subsidiaryRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const subsidiary = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.subsidiaries.updateOne(query, { $set: subsidiary });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated the subsidiary object: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find the subsidiary object: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update the subsidiary object: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Returns proper code depending on removal success or failure
subsidiaryRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.subsidiaries.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed the subsidiaries object: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove the subsidiary object: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find the subsidiary object: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
