import express from "express"

export function helloWorld(req: express.Request, res: express.Response){
    res.status(200).send("Hello World")
}