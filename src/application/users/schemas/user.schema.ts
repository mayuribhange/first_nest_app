import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    userName: string;

    @Prop()
    userEmail: string;

    @Prop()
    userPassword: string;

    @Prop()
    userPhone: string;

    @Prop()
    userState: string;

    @Prop()
    userCity: string;

    @Prop()
    userAddress:string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User)