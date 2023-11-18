import express from "express";
import {getAllOptionKeys, getConfig, setConfigValue} from "../controllers/config";
export const configRouter = express.Router();

configRouter.get("/getConfigValue", getConfig);
configRouter.get("/getAllConfigKeys", getAllOptionKeys);

configRouter.post("/setConfigValue", setConfigValue);