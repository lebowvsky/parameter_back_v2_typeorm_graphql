import { Field, InputType } from "type-graphql";

@InputType()
export default class DiverInput {
  @Field()
  id!: string;
}