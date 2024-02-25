import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestaurantService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  async create(createRestaurantInput: CreateRestaurantInput) {
    try {
      let isRestaurantPresent = await this.restaurantModel.findOne({
        restaurantName: createRestaurantInput.restaurantName,
        restaurantEmail: createRestaurantInput.restaurantEmail,
      });
      if (!isRestaurantPresent) {
        let data = await this.restaurantModel.create(createRestaurantInput);
        if (data) {
          return 'Restaurant Added Successfully...';
        } else {
          return 'Somthing went wrong';
        }
      } else {
        return 'Restaurant Already registered';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      let data = await this.restaurantModel.find();
      if (data && data.length > 0) {
        return data;
      } else {
        return 'Somthing went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.restaurantModel.findOne({ _id: id });
      if (data) {
        return data;
      } else {
        return 'Something went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, createRestaurantInput: CreateRestaurantInput) {
    try {
      let updated = await this.restaurantModel.findOneAndUpdate(
        { _id: id },
        createRestaurantInput,
        { $new: true },
      );
      if (updated) {
        return 'Restaurant updated successfully';
      } else {
        return 'Something went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.restaurantModel.findByIdAndUpdate(
        { _id: id },
        { isDeleted: true },
        { $new: true },
      );
      if (data) {
        return 'Restauurant deleted successfully.';
      } else {
        return 'somthing went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(restaurantEmail: string, password: string) {
    try {
      let data = await this.restaurantModel.findOne({
        restaurantEmail,
        password,
      });
      if (data) {
        const token = await this.jwtService.signAsync({ userId: data._id,userEmail:data.restaurantEmail });
        return {
          message: 'Logged In Successfully',
          token: token,
          _id:data._id
        };
      }
       else {
        return 'Something went wrong';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
