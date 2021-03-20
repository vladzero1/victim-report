import { User } from "../class/User";
import {
  validatePasswordLength,
  validatePhoneNumber,
} from "../utils/validation";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "src/types";

@InputType()
class PhoneNumberPasswordInput {
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(()=> Boolean)
  async user(
    // @Arg("phoneNumber") phoneNumber: string,
    @Ctx() { firestore }: MyContext
  ) {
    // const data = await (await firestore.collection("User").get()).docs.find();
    // console.log(data)
    // return data;
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Arg("username") username: string,
    @Ctx() { firestore }: MyContext
  ): Promise<UserResponse> {
    let errors = validatePhoneNumber(options.password);
    if (errors) {
      return { errors };
    }

    errors = validatePasswordLength(options.password, "password");
    if (errors) {
      return { errors };
    }

    let user: User | null = null;
    const hash = await argon2.hash(options.password);
    try {
      await firestore.collection("User").doc(options.phoneNumber).set({
        username: username,
        password: hash,
      });
      user = {
        username: username,
        password: hash,
        phoneNumber: options.phoneNumber,
      };
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: "email",
            message: "email is already exist!",
          },
        ],
      };
    }
    //auto-login
    // req.session.userId = user!.id;
    return { user: user! };
  }
}
