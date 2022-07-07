import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private  userService: UserService) {}
  
  @Post()
  async insertUser(
    @Body('email') userEmail:string,
    @Body('password') userPassword:string,
    @Body('isAdmin') userisAdmin:boolean = false,
  ) {
    const generatedId =await this.userService.insertUser(
        userEmail,
        userPassword,
        userisAdmin,
    )
    return { id: generatedId };
  }

  @Get()
  async getUser(){
    const result = await this.userService.getUser()
    return result;
  }

  @Get(':id')
  async getSingleUser(@Param('id') userId: string){
    const result = await this.userService.getSingleUser(userId)
    return result;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId:string,
    @Body('email') userEmail:string,
    @Body('password') userPassword: string,
    @Body('isAdmin') userIsAdmin: boolean
    ){
    await this.userService.UpdateUser(userId, userEmail, userPassword, userIsAdmin);
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string){
    await this.userService.deleteUser(userId);
    return null;
  }
}
