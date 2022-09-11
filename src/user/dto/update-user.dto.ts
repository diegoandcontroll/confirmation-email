import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/utils/message';
import { RegExHelper } from 'src/utils/regex';

@InputType({ isAbstract: true })
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @Field({ nullable: true })
  @IsOptional({ always: true })
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password?: string;
}
