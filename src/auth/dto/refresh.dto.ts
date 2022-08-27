import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType({ isAbstract: true })
export class UserInput {
  @Field(() => ID)
  @IsNotEmpty({ message: 'Email not empty' })
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Email not empty' })
  @IsEmail()
  email: string;
}
