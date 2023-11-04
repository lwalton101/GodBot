import {logRequest} from "./middleware/log";
import {testRouter} from "./router/test";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use(logRequest);
app.use(cors());

app.use("/test", testRouter);
