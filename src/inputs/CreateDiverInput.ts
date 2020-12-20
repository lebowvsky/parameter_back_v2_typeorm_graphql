import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateDiverInput {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field({ nullable: true })
  date_birthday?: string;
}
