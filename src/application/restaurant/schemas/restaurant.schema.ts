import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
    @Prop()
    restaurantName: string;

    @Prop()
    restaurantEmail: string;

    @Prop()
    password: string;

    @Prop()
    restaurantPhone: string;

    @Prop()
    restaurantState: string;

    @Prop()
    restaurantCity: string;

    @Prop()
    restaurantAddress:string;

    @Prop({enum:['non-veg','veg','both']})
    restaurantType:string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)