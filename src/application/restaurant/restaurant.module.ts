import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { Restaurant,RestaurantSchema } from './schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
console.log(process.env.JWT_SECRET);

@Module({
  imports:[
MongooseModule.forFeature([
  {name:Restaurant.name,schema:RestaurantSchema}
]),
JwtModule.register({
  secret: process.env.JWT_SECRET || 'defaultSecretKey',
  signOptions: { expiresIn: '1d' },
}),
  ],
  providers: [RestaurantResolver, RestaurantService],
  exports: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
