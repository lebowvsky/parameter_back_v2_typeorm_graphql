import { Resolver, Query } from "type-graphql";
import { Dive } from "../models/Dive";

@Resolver()
export default class DiveResolver {
  @Query(() => [Dive])
  dives(): Promise<Dive[]> {
    return Dive.find();
  }
}
