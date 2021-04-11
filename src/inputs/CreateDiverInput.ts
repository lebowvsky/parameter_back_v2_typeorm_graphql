import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDiverInput {
  @Field()
  height!: number;

  @Field()
  weight!: number;

  @Field()
  date_birthday?: Date;
}
