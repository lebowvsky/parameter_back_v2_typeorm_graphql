import { Field, InputType } from "type-graphql";
import Diver from "../models/Diver";

@InputType()
export default class CreateDiveInput {
  @Field()
  place!: string;

  @Field()
  depth!: number;

  @Field()
  duration!: number;

  @Field()
  gps!: string;

  @Field()
  gasMix!: string;
}
