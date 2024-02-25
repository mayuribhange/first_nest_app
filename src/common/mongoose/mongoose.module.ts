import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { urlencoded } from "express";

const user = process.env.USER_NAME
const password = process.env.USER_PASSWORD

// for local database
// @Module({
//     imports: [
//         MongooseModule.forRoot(`mongodb://localhost:27017/Basic-project`, {
//             authSource: "Basic-project"
//             // user,
//             // pass,
//         }),
//     ],   
// })

// for atlas
@Module({
    imports: [
        MongooseModule.forRoot(
        `mongodb+srv://palsatish646:5FvRiWmLmu8asNM1@cluster0.w4wsasz.mongodb.net/Basic-project?retryWrites=true&w=majority`,
      ),
     ],
})

export class MongooseConfigModule { }
