import { User } from "../entity/User";
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
import { CollectionType, UserType, FieldName } from "../utils/enums";
import { FieldError } from "../utils/FieldError";
import { PHONE_NUMBER_COOKIE_NAME } from "../constant";

@InputType()
export class PhoneNumberPasswordInput {
  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class Region {
  @Field(() => [String], { nullable: true })
  region?: String[];
}

@Resolver(User)
export class UserResolver {
  // example to query using arguments
  @Query(() => UserResponse)
  async user(
    @Arg("phoneNumber") phoneNumber: string,
    @Ctx() { firestore }: MyContext
  ): Promise<UserResponse> {
    const user = await firestore
      .collection(CollectionType.User)
      .doc(phoneNumber)
      .get()
      .then((querySnapshot) => {
        const user = querySnapshot.data() as User;
        user.phoneNumber = phoneNumber;
        return user;
      });

    if (!user) {
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
      user: user,
    };
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Arg("username") username: string,
    @Arg("region") region: string,
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
          region: region,
        });
      user = {
        username: username,
        password: hash,
        phoneNumber: options.phoneNumber,
        region: region,
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
    req.session.userType = UserType.User;
    return { user: user! };
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Ctx() { firestore, req }: MyContext
  ): Promise<UserResponse> {
    const user = await firestore
      .collection(CollectionType.User)
      .doc(options.phoneNumber)
      .get()
      .then((value) => {
        const user = value.data() as User;
        return user;
      });
      console.log("login");
    if (!user) {
      return {
        errors: [
          {
            field: FieldName.PhoneNumber,
            message: "the user is not exist",
          },
        ],
      };
    }
     const valid = await argon2.verify(user.password, options.password);
     if (!valid) {
       return {
         errors: [
           {
             field: FieldName.Password,
             message: "Wrong password!",
           },
         ],
       };
     }
    user.phoneNumber = options.phoneNumber;
    req.session.phoneNumber = options.phoneNumber;
    req.session.userType = UserType.User;
    return {
      user: user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        res.clearCookie(PHONE_NUMBER_COOKIE_NAME);
        resolve(true);
      })
    );
  }

  @Query(() => Region)
  async getAllRegion(@Ctx() { firestore }: MyContext): Promise<Region> {
    const regions: string[] = [];
    await firestore
      .collection(UserType.User)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((value) => {
          const user = value.data() as User;
          regions.push(user.region);
        });
      });
    const uniqueRegions = [...new Set(regions)];
    return {
      region: uniqueRegions,
    };
  }
}
