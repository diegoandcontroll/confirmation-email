import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { AuthType } from './dto/auth.type';
import { LoginInput } from './dto/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: LoginInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
