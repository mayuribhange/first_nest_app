import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { FoodCategory } from './foodCategory.schema';
export type RestaurantFoodCategoryDocument = HydratedDocument<RestaurantFoodCategory>;

@Schema({ timestamps: true })
export class RestaurantFoodCategory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Restaurant;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:"FoodCategory"})
  foodCategoryId:FoodCategory;
}
export const RestaurantFoodcategorySchema = SchemaFactory.createForClass(RestaurantFoodCategory);
