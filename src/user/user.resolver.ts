import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UpdateUserInterface } from './interfaces/user-updated.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.find();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async userbyEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.store(data);
    return user;
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<UpdateUserInterface> {
    const user = this.userService.updateUser(id, data);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async DeleteUser(@Args('id') id: string): Promise<boolean> {
    const deletedUser = await this.userService.deleteUser(id);
    return deletedUser;
  }
}
