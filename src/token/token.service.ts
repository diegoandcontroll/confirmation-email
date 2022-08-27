import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private readonly tokenRepository: Repository<Token>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async saveToken(hash: string, username: string) {
    const objToken = await this.tokenRepository.findOne({
      where: { username },
    });
    if (!objToken) {
      const token = this.tokenRepository.create({
        username,
        hash,
      });
      await this.tokenRepository.save(token);
    } else {
      await this.tokenRepository.update(objToken.id, {
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOne({
      where: { hash: oldToken },
    });

    if (!objToken) {
      throw new HttpException(
        {
          errorMessage: 'INVALID_TOKEN',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.findUserByEmail(objToken.username);
    return this.authService.login(user);
  }
}
