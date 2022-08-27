import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MessagesHelper } from 'src/utils/message';
import { RegExHelper } from 'src/utils/regex';

@InputType({ isAbstract: true })
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty({ message: 'Name not empty' })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty({ message: 'PhotoUrl not empty' })
  @IsOptional()
  photoUrl?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Password not empty' })
  @IsOptional()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password?: string;
}
