import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import AppUser from "./AppUser";
import Dive from "./Dive";

@Entity()
@ObjectType()
export default class Diver extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => Number)
  height!: number;

  @Column()
  @Field(() => String)
  weight!: number;

  @Column()
  @Field(() => Date)
  date_birthday?: Date;

  @OneToOne((type) => AppUser, (appUser) => appUser.diver, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @Field((type) => AppUser, { nullable: true })
  appUser: AppUser;

  @ManyToMany((type) => Dive, (dive) => dive.divers, { lazy: true })
  @Field((type) => [Dive])
  dives: Promise<Dive[]>;
}
