import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  phoneNumber!: string;

  password!: string;
  
  @Field(()=>String)
  type!: string;
}
