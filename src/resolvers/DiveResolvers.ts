import { Resolver, Query, Mutation, Arg } from "type-graphql";
import CreateDiveInput from "../inputs/CreateDiveInput";
import DiverInput from "../inputs/DiverInput";
import { Dive } from "../models/Dive";
import { Diver } from "../models/Diver";

@Resolver()
export default class DiveResolver {
  @Query(() => [Dive])
  dives(): Promise<Dive[]> {
    return Dive.find();
  }

  @Mutation(() => Dive)
  async createDive(
    @Arg('dive') input: CreateDiveInput,
    @Arg('divers', type => [DiverInput]) divers: Diver[]
    ): Promise<Dive> {
    const dive = new Dive();
    dive.place = input.place;
    dive.depth = input.depth;
    dive.duration = input.duration;
    dive.gps = input.gps;
    dive.gasMix = input.gasMix;
    dive.divers = Promise.resolve(divers);
    await dive.save();
    return dive;
  }
}
