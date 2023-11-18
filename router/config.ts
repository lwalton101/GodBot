import express from "express";
import {getAllOptionKeys, getConfig, getConfigValues, setConfigValue} from "../controllers/config";
export const configRouter = express.Router();

configRouter.get("/getConfigValue", getConfig);
configRouter.get("/getAllConfigKeys", getAllOptionKeys);
configRouter.get("/getConfigData", getConfigValues)

configRouter.post("/setConfigValue", setConfigValue);