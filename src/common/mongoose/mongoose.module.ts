import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_DATABASE;

const url = `${host}:${port}/${db}`;

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb://localhost:27017/Basic-project`, {
            // uri_decode_auth: true,
            authSource: "Basic-project"
            // user,
            // pass,
        }),
    ],
})

export class MongooseConfigModule { }
