import { Injectable,Inject } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User,UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
const ObjectId = Types.ObjectId;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) { }
  async create(createUserInput: CreateUserInput) {
    try {
      const check = createUserInput.userEmail;
      const isUserExist =await this.userModel.findOne({userEmail:check})
      if(isUserExist){
        return 'Email already exist'
      }
      else{
      const data = await this.userModel.create(createUserInput) 
      if(data){
        return 'User created successfully'
      }
      else{
        throw new Error('Something went wrong')
      }
    }
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
  try{
let data = await this.userModel.find();
return data;
  }
  catch(error){
    throw new Error(error)
  }
  }

  async findOne(id: string) {
  try{
    let userId = new ObjectId(id);
    let data = await this.userModel.findOne({_id:userId})
    return data;
  }
  catch(error){
    throw new Error(error)
  }
  }

  async update(id: string, createUserInput: CreateUserInput) {
    try{
const data = await this.userModel.findOneAndUpdate({_id:id},createUserInput,{$new:true})
if(!data){
  return 'Something went wrong'
}
else {
  return 'User updated successfully'
}
    }
    catch(error){
      throw new Error(error)
    }
    
  }

  async remove(id: string, createUserInput: CreateUserInput) {
    try{
      const data = await this.userModel.findOneAndUpdate({_id:id},createUserInput,{$new:true})
      if(!data){
        return 'Something went wrong'
      }
      else {
        return 'User Deleted successfully'
      }
          }
          catch(error){
            throw new Error(error)
          }
  }
}
