import { Injectable } from '@nestjs/common';
import { CreateFoodCategory, CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { FoodCategory,FoodCategoryDocument } from './schemas/foodCategory.schema';

@Injectable()
export class FoodCategoryService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(FoodCategory.name)
    private foodCategoryModel: Model<FoodCategoryDocument>,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  async create(createFoodCategoryInput: CreateFoodCategory) {
    try {
        console.info(createFoodCategoryInput);
      const IS_CATEGORY_PRESENT = await this.foodCategoryModel.findOne({
        categoryName: createFoodCategoryInput.categoryName,
      });
      if (!IS_CATEGORY_PRESENT) {
        const RESULT = await this.foodCategoryModel.create(createFoodCategoryInput);
        console.log("hgjhgh",RESULT);
        
        if (RESULT) {
          return 'Category Added Successfully...';
        } else {
          return 'Somthing went wrong';
        }
      } else {
        return 'Category Already registered';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll() {
    try {
        const RESULT = await this.foodCategoryModel.find();
      if (RESULT && RESULT.length > 0) {
        return RESULT;
      } else {
        return 'Somthing went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
        const RESULT = await this.foodCategoryModel.findOne({ _id: id });
      if (RESULT) {
        return RESULT;
      } else {
        return 'Something went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
