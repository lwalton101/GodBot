import express from "express"
import {config} from "../index";
import {GetTestModel} from "../model/GetTestModel";
import {SetConfigValueModel} from "../model/SetConfigValueModel";

export function getConfig(req: express.Request<{}, {}, GetTestModel>, res: express.Response){
    if(config.hasConfigOption(req.body.itemName)){
        res.status(200).send({value: config.getConfigOption(req.body.itemName)})
    } else{
        res.status(400).send({message: "Uh Oh! someone did an oopsie and sent an invalid config option"})
    }
}

export function getAllOptionKeys(req: express.Request<{}, {}, GetTestModel>, res: express.Response){
    res.status(200).send({configKeys: config.getAllConfigOptions()});
}

export function setConfigValue(req: express.Request<{}, {}, SetConfigValueModel>, res: express.Response){
    if(config.hasConfigOption(req.body.optionName)){
        config.setConfigOption(req.body.optionName, req.body.value);
        res.status(200).send({message: "Set Value"});
    } else{
        res.status(400).send({message: "Value " + req.body.optionName + " does not exist"});
    }
}

export function getConfigValues(req: express.Request, res: express.Response){
    res.status(200).send({configValues: config.getConfigData()});
}
