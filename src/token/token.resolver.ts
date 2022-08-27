import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthType } from 'src/auth/dto/auth.type';
import { TokenService } from './token.service';

@Resolver('RefreshToken')
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => AuthType)
  async refreshToken(@Args('oldToken') oldToken: string): Promise<AuthType> {
    const response = await this.tokenService.refreshToken(oldToken);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
