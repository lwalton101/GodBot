import express from "express";

export function logRequest(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(`${req.method} ${req.path}`);
    next()
}