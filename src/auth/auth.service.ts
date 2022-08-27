import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { AuthType } from './dto/auth.type';
import { LoginInput } from './dto/login.dto';
import { User } from 'src/user/user.entity';
import { TokenService } from 'src/token/token.service';
import { UserInput } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(data: LoginInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    const validPasssword = compareSync(data.password, user.password);

    if (!validPasssword) {
      throw new UnauthorizedException('Incorrect password');
    }
    if (!user.confirmed) {
      throw new UnauthorizedException('Confirm Link in Email');
    }
    const token = await this.jwtToken(user);
    await this.tokenService.saveToken(token, data.email);
    return {
      user,
      token,
    };
  }
  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async login(user: UserInput): Promise<AuthType> {
    const userFind = await this.userService.findUserByEmail(user.email);
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    await this.tokenService.saveToken(token, user.email);
    return {
      user: userFind,
      token,
    };
  }
}
