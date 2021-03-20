import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  // ObjectType,
  // Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { Victim } from "../class/Victim";
import { CollectionType } from "../utils/enums";

@InputType()
class CreateVictimInput {
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
}

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string;

//   @Field()
//   message: string;
// }

// @ObjectType()
// class VictimResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Victim, { nullable: true })
//   victim?: Victim;
// }

@Resolver(Victim)
export class VictimResolver {
  @Mutation(() => Boolean)
  async createVictim(
    @Arg("options",()=>CreateVictimInput) options: CreateVictimInput,
    @Ctx() {firestore, req}: MyContext
  ) {
    const phoneNumber = req.session.phoneNumber!;
    let data = {} as Victim
    data = { ...options, creatorPhoneNumber: phoneNumber };
    firestore.collection(CollectionType.Victim)
    .add(data)
    return true;
  }

  // example to query using arguments
  // @Query(() => VictimResponse)
  // async user(
  //   @Arg("phoneNumber") phoneNumber: string,
  //   @Ctx() { firestore }: MyContext
  // ): Promise<VictimResponse> {
  //   const data = await firestore
  //     .collection("User")
  //     .doc(phoneNumber)
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.data() as Victim;
  //       return data;
  //     });
  //   // const data = await firestore
  //   //   .collection("User")
  //   //   .where("username", "==", "bob")
  //   //   .get()
  //   //   .then((querySnapshot) => {
  //   //     querySnapshot.docs.map((doc) => console.log(doc.data()));
  //   //   });
  //   if (!data) {
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
  //     user: data,
  //   };
  // }
}
