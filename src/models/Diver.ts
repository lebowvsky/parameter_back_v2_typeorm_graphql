import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Dive } from "./Dive";

@Entity()
@ObjectType()
export class Diver extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  firstname!: string;

  @Column()
  @Field(() => String)
  lastname!: string;

  @Column()
  @Field(() => String)
  date_birthday?: string;

  @ManyToMany(type => Dive, dive => dive.divers, {lazy: true})
  @Field(type => [Dive])
  dives: Promise<Dive[]>
}
