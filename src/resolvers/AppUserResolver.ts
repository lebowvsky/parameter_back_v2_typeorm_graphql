import { hash } from "bcrypt";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

import AppUser from "../models/AppUser";
import Diver from "../models/Diver";
import {
  GetAppUserByIdInput,
  CreateNewAppUserInput,
  UpdateAppUserInput,
} from "../inputs/AppUserInput";
import { CreateDiverInput } from '../inputs/CreateDiverInput';

@Resolver()
export default class AppUserResolver {
  @Query(() => AppUser)
  getUserById(@Arg("id") id: GetAppUserByIdInput): Promise<AppUser | undefined> {
    return AppUser.findOne(id);
  }

  @Query(() => [AppUser])
  getAllUsers(): Promise<AppUser[]> {
    return AppUser.find();
  }

  @Mutation(() => AppUser)
  async createAppUser(
    @Arg("data") data: CreateNewAppUserInput,
    @Arg("diverData") diverData: CreateDiverInput
  ): Promise<AppUser> {
    data.password = await hash(data.password, 10);
    
    const appUser = AppUser.create(data);
    const diver = Diver.create(diverData);
    
    if (!appUser) throw new Error("Impossible to create a new User...");

    appUser.diver = diver;
    await diver.save();
    await appUser.save();
    return appUser;
  }

  @Mutation(() => AppUser)
  async updateAppUserById(
    @Arg("id") id: string,
    @Arg("data") data: UpdateAppUserInput
  ): Promise<AppUser> {
    const appUser = await AppUser.findOne(id);
    if (!appUser) throw new Error("No User with this id...");

    Object.assign(appUser, data);

    await appUser.save();
    return appUser;
  }

  @Mutation(() => String)
  async deleteAppUserById(@Arg("id") id: string): Promise<String> {
    const appUser = await AppUser.findOne(id);
    if (!appUser) throw new Error("No User with this id...");
    // await AppUser.remove(appUser);
    // return appUser;
    await AppUser.delete(id);
    return `AppUser ${appUser.firstname} ${appUser.lastname} deleted...`;
  }
}
