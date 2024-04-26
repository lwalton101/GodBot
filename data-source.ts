import "reflect-metadata"
import { DataSource } from "typeorm"
import {WordUser} from "./entities/WordUser";
import {env} from "./index";

export const db = new DataSource({
    type: "mysql",
    host: env.MYSQL_IP,
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: "godbot",
    synchronize: true,
    logging: false,
    entities: [WordUser],
    migrations: [],
    subscribers: [],
})

export const wordUserRepo = db.manager.getRepository(WordUser);
