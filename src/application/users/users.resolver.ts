import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query('getUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('getUserById')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('id') id:string,@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.update(id, createUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id:string,@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.remove(id, createUserInput);
  }
}
