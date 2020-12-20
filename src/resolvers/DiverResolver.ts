import { Resolver, Query, Mutation, Arg } from "type-graphql";
import CreateDiverInput from "../inputs/CreateDiverInput";
import { Diver } from "../models/Diver";

@Resolver()
export default class DiverResolver {
  @Query(() => [Diver])
  divers(): Promise<Diver[]> {
    return Diver.find();
  }

  @Mutation(() => Diver)
  async createDiver(@Arg('data') data: CreateDiverInput): Promise<Diver> {
    const diver = Diver.create(data);
    await diver.save();
    return diver;
  }
}
