import { Admin } from "../entity/Admin";
import { MyContext } from "../types";
import { UserType, CollectionType } from "../utils/enums";
import { FieldError } from "../utils/FieldError";
import {
  validatePhoneNumber,
  validatePasswordLength,
} from "../utils/validation";
import {
  Field,
  ObjectType,
  // Query,
  Ctx,
  Arg,
  Mutation,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { PhoneNumberPasswordInput } from "./user";

@ObjectType()
class AdminResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver(Admin)
export class AdminResolver {
  // @Query(() => Admin, { nullable: true })
  // async me(@Ctx() { req, firestore }: MyContext): Promise<Admin | undefined> {
  //   const phoneNumber = req.session.phoneNumber;
  //   const userType = req.session.userType;
  //   if (!phoneNumber || !userType) {
  //     return undefined;
  //   }
  //   let collectionType = null;
  //   if (userType === UserType.Admin) {
  //     collectionType = CollectionType.Admin;
  //   } else {
  //     collectionType = CollectionType.User;
  //   }
  //   await firestore
  //     .collection(collectionType)
  //     .doc(phoneNumber)
  //     .get()
  //     .then((querySnapshot) => {
  //       const admin = querySnapshot.admin() as Admin;
  //       admin.phoneNumber = phoneNumber;
  //       return admin;
  //     });

  //   return undefined;
  // }

  // example to query using arguments
  // @Query(() => AdminResponse)
  // async user(
  //   @Arg("phoneNumber") phoneNumber: string,
  //   @Ctx() { firestore }: MyContext
  // ): Promise<AdminResponse> {
  //   const admin = await firestore
  //     .collection(CollectionType.User)
  //     .doc(phoneNumber)
  //     .get()
  //     .then((querySnapshot) => {
  //       const admin = querySnapshot.admin() as Admin;
  //       admin.phoneNumber = phoneNumber;
  //       return admin;
  //     });

  //   if (!admin) {
  //     return {
  //       errors: [
  //         {
  //           field: "phoneNumber",
  //           message: "Phone Number is not exist",
  //         },
  //       ],
  //     };
  //   }
  //   return {
  //     admin: admin,
  //   };
  // }

  @Mutation(() => AdminResponse)
  async registerAdmin(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Arg("username") username: string,
    @Ctx() { firestore, req }: MyContext
  ): Promise<AdminResponse> {
    let errors = validatePhoneNumber(options.password);
    if (errors) {
      return { errors };
    }

    errors = validatePasswordLength(options.password, "password");
    if (errors) {
      return { errors };
    }

    let admin: Admin | null = null;
    const hash = await argon2.hash(options.password);
    try {
      await firestore
        .collection(CollectionType.User)
        .doc(options.phoneNumber)
        .create({
          username: username,
          password: hash,
        });
      admin = {
        username: username,
        password: hash,
        phoneNumber: options.phoneNumber,
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
    req.session.phoneNumber = admin!.phoneNumber;
    req.session.userType = UserType.Admin;
    return { admin: admin! };
  }

  @Mutation(() => AdminResponse)
  async loginAdmin(
    @Arg("options") options: PhoneNumberPasswordInput,
    @Ctx() { firestore, req }: MyContext
  ): Promise<AdminResponse> {
    const admin = await firestore
      .collection(UserType.Admin)
      .doc(options.phoneNumber)
      .get()
      .then((value) => {
        const admin = value.data() as Admin;
        return admin;
      });
    if (!admin) {
      return {
        errors: [
          {
            field: "PhoneNumber",
            message: "the Phone Number is not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(admin.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Wrong password!",
          },
        ],
      };
    }
    admin.phoneNumber = options.phoneNumber;
    req.session.phoneNumber = options.phoneNumber;
    req.session.userType = UserType.Admin;
    return {
      admin: admin,
    };
  }
}
