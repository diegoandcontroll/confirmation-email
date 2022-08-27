import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/utils/message';
import { RegExHelper } from 'src/utils/regex';

@InputType({ isAbstract: true })
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Email not empty' })
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password not empty' })
  @IsString({})
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
