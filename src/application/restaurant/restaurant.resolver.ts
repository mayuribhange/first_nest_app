import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { CreateFoodCategory, CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { FoodCategoryService } from './foodCategory.service';

@Resolver('Restaurant')
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService, readonly foodCategoryService: FoodCategoryService) {}
  @Mutation('createRestaurant')
  create(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Mutation('createFoodCategory')
  createFoodCategory(@Args('createFoodCategoryInput') createFoodCategoryInput: CreateFoodCategory ){
      return this.foodCategoryService.create(createFoodCategoryInput)
  }

  @Query('getAllRestaurant')
  findAll() {
    return this.restaurantService.findAll();
  }

  @Query('getRestaurantById')
  findOne(@Args('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Mutation('updateRestaurant')
  update(@Args('id')id:string,
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantService.update(id,createRestaurantInput);
  }

  @Mutation('removeRestaurant')
  remove(@Args('id') id: string) {
    return this.restaurantService.remove(id);
  }

  @Query('restaurantLogin')
  restaurantLogin(@Args('restaurantEmail')restaurantEmail:string,@Args('password')password:string) {
    return this.restaurantService.login(restaurantEmail,password)
  }
}
