import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { FoodCategory } from './foodCategory.schema';
import { Restaurant } from './restaurant.schema';
import { RestaurantFoodCategory } from './restaurantFoodCategory.schema';

export type MenuItemDocument = HydratedDocument<MenuItem>;

@Schema({ timestamps: true })
export class MenuItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantFoodCategory' })
  restaurantFoodCategoryId: RestaurantFoodCategory;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({default:true})
  isAvailable:boolean;

}
export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
