import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DbModule } from 'src/db/db.module';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';

@Module({
    imports: [DbModule],
    providers: [UserService, UserResolver, ...userProviders],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
