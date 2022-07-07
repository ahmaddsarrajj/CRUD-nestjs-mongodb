import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

    //add user
    async insertUser(email: string, password: string, isAdmin: boolean) {
        const newUser = new this.UserModel({
            email,
            password,
            isAdmin,
        })
        const result = await newUser.save();
        return result.id as string;
    }
    //get user
    async getUser() {
        const users = await this.UserModel.find().exec();
        return users.map((user) => ({
            id: user.id,//here we don't use _id because it stored frome the interface
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        }));
    }

    //get user by id

    //check the presence of the user
    private async findUser(id: string): Promise<User> {
        const user = await this.UserModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('could not find user.')
        }
        return user;
    }

    //get single user
    async getSingleUser(userId: string){
        const user = await this.findUser(userId)
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        }
    }

    //update user
    async UpdateUser(
        id: string,
        email: string,
        password: string,
        isAdmin: boolean
    ){
        const updateduser = await this.findUser(id);
        if(email){
            updateduser.email = email; 
        }
        if(password){
            updateduser.password = password; 
        }
        if(isAdmin){
            updateduser.isAdmin = isAdmin; 
        }
        updateduser.save();
    }

    //delete 
    async deleteUser(userId: string){
        await this.UserModel.deleteOne({_id: userId}).exec(); //here we use _id because it stored frome the database
    }
}


