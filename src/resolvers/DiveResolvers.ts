import { Resolver, Query, Mutation, Arg } from "type-graphql";
import CreateDiveInput from "../inputs/CreateDiveInput";
import DiverInput from "../inputs/DiverInput";
import Dive from "../models/Dive";
import Diver from "../models/Diver";

@Resolver()
export default class DiveResolver {
  @Query(() => [Dive])
  dives(): Promise<Dive[]> {
    return Dive.find();
  }

  @Mutation(() => Dive)
  async createDive(
    @Arg('data') data: CreateDiveInput,
    @Arg('divers', type => [DiverInput]) divers: Diver[]
    ): Promise<Dive> {
    const dive = Dive.create(data);
    dive.divers = Promise.resolve(divers);
    await dive.save();
    return dive;
  }
  
  @Mutation(() => String)
  async deleteDiveById(@Arg('id') id: string): Promise<String> {
    const dive = await Dive.findOne(id);
    if (!dive) throw new Error("No dive with this id...");
    await Dive.delete(id);
    return `${dive.place} Dive deleted...`;
  }
}
