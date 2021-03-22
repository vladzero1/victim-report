import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Victim {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  age!: string;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  photo!: string;

  @Field(() => String)
  gender!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  creatorPhoneNumber: string;

  @Field(() => String)
  region: string;
}
