import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { subsidiaryRouter } from "./routes/subsidiary.routes"
import { carRouter } from "./routes/car.routes";
import { usersRouter } from "./routes/users.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(cookieParser());

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use("/subsidiaries", subsidiaryRouter);
        app.use("/users", usersRouter);
        app.use("/cars", carRouter);

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

    })
    .catch(error => console.error(error));
