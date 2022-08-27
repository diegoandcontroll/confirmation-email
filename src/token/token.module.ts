import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { tokenProviders } from './token.provider';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';

@Module({
  imports: [DbModule, UserModule, forwardRef(() => AuthModule)],
  providers: [TokenResolver, TokenService, ...tokenProviders],
  exports: [TokenService],
})
export class TokenModule {}
