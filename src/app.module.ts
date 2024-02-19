import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './application/users/users.module';
import { AdminModule } from './application/admin/admin.module';
import { MongooseConfigModule } from './common/mongoose/mongoose.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { RestaurantModule } from './application/restaurant/restaurant.module';
@Module({
  imports: [UsersModule, AdminModule,MongooseConfigModule,GraphqlModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
