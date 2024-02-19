import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { Restaurant,RestaurantSchema } from './schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
MongooseModule.forFeature([
  {name:Restaurant.name,schema:RestaurantSchema}
])
  ],
  providers: [RestaurantResolver, RestaurantService],
  exports: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
