import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType({ isAbstract: true })
export class AuthType {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
