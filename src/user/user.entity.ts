import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashPasswordTransform } from 'src/utils/hash';
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'photo_url' })
  photoUrl: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
