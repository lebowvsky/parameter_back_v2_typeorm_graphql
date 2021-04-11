import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import Diver from "./Diver";

@Entity()
@ObjectType()
export default class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  firstname!: string;

  @Column()
  @Field()
  lastname!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field()
  password!: string;

  @OneToOne((type) => Diver, (diver) => diver.appUser, {
    lazy: true,
    cascade: true,
  })
  @Field()
  diver: Diver;
}
