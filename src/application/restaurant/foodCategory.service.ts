import { Injectable } from '@nestjs/common';
import { CreateFoodCategory } from './dto/create-restaurant.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {
  FoodCategory,
  FoodCategoryDocument,
} from './schemas/foodCategory.schema';
import {
  CATEGORY_NOT_EXISTS,
  FOOD_CATEGORY_ALREADY_EXISTS,
  FOOD_CATEGORY_SAVED_SUCCESSFULLY,
  INTERNAL_SERVER_ERROR,
} from 'constant/responseConstant';

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
        const RESULT = await this.foodCategoryModel.create(
          createFoodCategoryInput,
        );
        console.log('hgjhgh', RESULT);

        if (RESULT) {
          return FOOD_CATEGORY_SAVED_SUCCESSFULLY;
        } else {
          return INTERNAL_SERVER_ERROR;
        }
      } else {
        return FOOD_CATEGORY_ALREADY_EXISTS;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async findFoodCategory() {
    try {
      const RESULT = await this.foodCategoryModel.find();
      if (RESULT && RESULT.length > 0) {
        return RESULT;
      } else {
        return CATEGORY_NOT_EXISTS;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findFoodCategoryById(id: string) {
    try {
      console.info(id);
      const RESULT = await this.foodCategoryModel.findOne({ _id: id });
      if (!RESULT) {
        console.info(RESULT);
        return RESULT;
      } else {
        return CATEGORY_NOT_EXISTS;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
