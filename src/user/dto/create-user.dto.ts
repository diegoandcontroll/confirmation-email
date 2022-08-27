import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/utils/message';
import { RegExHelper } from 'src/utils/regex';

@InputType({ isAbstract: true })
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'Name not empty' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email not empty' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  photoUrl: string;

  @Field()
  @IsNotEmpty({ message: 'Password not empty' })
  @IsString({})
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
