import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class GetAppUserByIdInput {
  @Field(() => String)
  id!: string;
}

@InputType()
export class CreateNewAppUserInput {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;
}

@InputType()
export class UpdateAppUserInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
