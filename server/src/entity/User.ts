import { Field, ObjectType } from "type-graphql";
import { Account } from "../utils/Account";

@ObjectType()
export class User implements Account{
  @Field(() => String)
  username!: string;

  @Field(() => String)
  phoneNumber!: string;

  password!: string;

  @Field(() => String)
  region!: string;
}
