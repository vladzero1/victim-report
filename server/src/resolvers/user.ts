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
import { MyContext } from "../types";
import { CollectionType } from "../utils/enums";

@InputType()
class PhoneNumberPasswordInput {
  @Field()
  phoneNumber: string;

  @Field()
  password: string;

  @Field()
  type: string;
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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, firestore }: MyContext): Promise<User | undefined> {
    const phoneNumber = req.session.phoneNumber;
    if (!phoneNumber) {
      return undefined;
    }
    await firestore
      .collection(CollectionType.User)
      .doc(phoneNumber)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data() as User;
        data.phoneNumber = phoneNumber;
        return data;
      });

    return undefined;
  }

  // example to query using arguments
  @Query(() => UserResponse)
  async user(
    @Arg("phoneNumber") phoneNumber: string,
    @Ctx() { firestore }: MyContext
  ): Promise<UserResponse> {
    const data = await firestore
      .collection(CollectionType.User)
      .doc(phoneNumber)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data() as User;
        data.phoneNumber = phoneNumber;
        return data;
      });
    // const data = await firestore
    //   .collection("User")
    //   .where("username", "==", "bob")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.docs.map((doc) => console.log(doc.data()));
    //   });
    if (!data) {
      return {
        errors: [
          {
            field: "phoneNumber",
            message: "Phone Number is not exist",
          },
        ],
      };
    }
    return {
      user: data,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Arg("username") username: string,
    @Ctx() { firestore, req }: MyContext
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
      await firestore
        .collection(CollectionType.User)
        .doc(options.phoneNumber)
        .create({
          username: username,
          password: hash,
        });
      user = {
        username: username,
        password: hash,
        phoneNumber: options.phoneNumber,
        type: options.type
      };
    } catch (err) {
      /* err type still unknown*/
      if (err.code === 6)
        return {
          errors: [
            {
              field: "PhoneNumber",
              message: "Phone Number is already exist!",
            },
          ],
        };
    }
    //auto-login
    req.session.phoneNumber = user!.phoneNumber;
    return { user: user! };
  }

  @Mutation(() => UserResponse)
  async Login(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Ctx() { firestore, req }: MyContext
  ): Promise<UserResponse> {
    const data = await firestore.collection(CollectionType.User)
    .doc(options.phoneNumber)
    .get()
    .then((value)=>{
      const data = value.data() as User;
      data.phoneNumber = options.phoneNumber;
      return data;
    })
    req.session.phoneNumber = options.phoneNumber;
    return {
      user: data,
    };
  }
}
