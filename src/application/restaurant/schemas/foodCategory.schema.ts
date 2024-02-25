import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
export type FoodCategoryDocument = HydratedDocument<FoodCategory>;

@Schema({ timestamps: true })
export class FoodCategory {
  @Prop()
  categoryName:string;
}
export const FoodcategorySchema = SchemaFactory.createForClass(FoodCategory);
