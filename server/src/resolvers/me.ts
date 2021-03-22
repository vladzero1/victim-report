import { User } from "../entity/User";
import { MyContext } from "../types";
import { CollectionType, UserType } from "../utils/enums";
import { Query, Ctx, Resolver, ObjectType, Field } from "type-graphql";
import { FieldError } from "../utils/FieldError";
import { Admin } from "../entity/Admin";

@ObjectType()
class MeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver()
export class MeResolver {
  @Query(() => MeResponse, { nullable: true })
  async me(
    @Ctx() { req, firestore }: MyContext
  ): Promise<MeResponse | undefined> {
    const phoneNumber = req.session.phoneNumber;
    const userType = req.session.userType;
    if (!phoneNumber) {
      return undefined;
    }
    if (userType === UserType.User) {
      try {
        const data: User = await firestore
          .collection(CollectionType.User)
          .doc(phoneNumber!)
          .get()
          .then((querySnapshot) => {
            let data = querySnapshot.data() as User;
            data.phoneNumber = phoneNumber;
            return data;
          });
        return { user: data! };
      } catch (error) {
        return {
          errors: [
            {
              field: "phoneNumber",
              message: "Phone Number is not exist",
            },
          ],
        };
      }
    }
    if (userType === UserType.Admin) {
      try {
        const data: Admin = await firestore
          .collection(CollectionType.Admin)
          .doc(phoneNumber)
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.data() as Admin;
            data.phoneNumber = phoneNumber;
            return data;
          });
        return {
          admin: data! as Admin,
        };
      } catch (error) {
        return {
          errors: [
            {
              field: "phoneNumber",
              message: "Phone Number is not exist",
            },
          ],
        };
      }
    }
    return undefined;
  }
}
