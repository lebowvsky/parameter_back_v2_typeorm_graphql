import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import Diver from "./Diver";

@Entity()
@ObjectType()
export default class Dive extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field((type) => String)
  place!: string;

  @Column()
  @Field((type) => Number)
  depth!: number;

  @Column()
  @Field((type) => Number)
  duration!: number;

  @Column()
  @Field((type) => String)
  gps!: string;

  @Column()
  @Field((type) => String)
  gasMix!: string;

  @ManyToMany(type => Diver, diver => diver.dives, {lazy: true})
  @JoinTable({
    name: "dive_diver",
    joinColumn: {
      name: "diveId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "diverId",
      referencedColumnName: "id"
    }
  })
  @Field(type => [Diver])
  divers: Promise<Diver[]>;

}
