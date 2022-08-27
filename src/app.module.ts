import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginUsageReportingDisabled,
} from 'apollo-server-core';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // csrfPrevention: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      cache: 'bounded',
      // plugins: [
      //   ApolloServerPluginUsageReportingDisabled(),
      //   ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      // ],
      // introspection: true,
    }),
    UserModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
