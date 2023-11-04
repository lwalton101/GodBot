import express from "express";
import {helloWorld} from "../controllers/test";

export const testRouter = express.Router();

testRouter.get("/helloworld", helloWorld)

