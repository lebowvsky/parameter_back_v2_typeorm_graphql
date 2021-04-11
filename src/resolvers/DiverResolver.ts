import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { CreateDiverInput } from "../inputs/CreateDiverInput";
import Diver from "../models/Diver";

@Resolver()
export default class DiverResolver {
  @Query(() => [Diver])
  divers(): Promise<Diver[]> {
    return Diver.find();
  }

  @Mutation(() => Diver)
  async createDiver(@Arg("data") data: CreateDiverInput): Promise<Diver> {
    const diver = Diver.create(data);
    if (!diver) throw new Error("Impossible to create a new Diver");

    await diver.save();
    return diver;
  }

  @Mutation(() => String)
  async deleteDiverById(@Arg("id") id: string): Promise<String> {
    const diver = await Diver.findOne(id)
    if (!diver) throw new Error("No diver with this id...");
    await Diver.remove(diver);
    return "Diver deleted";
  }
}
