import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { Victim } from "../entity/Victim";
import { CollectionType } from "../utils/enums";
import { User } from "../entity/User";

@InputType()
class CreateVictimInput {
  @Field(() => String)
  name!: string;

  @Field(() => Int)
  age!: number;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  photo!: string;

  @Field(() => String)
  gender!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  region!: string;
}

@ObjectType()
class VictimData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  age!: number;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  photo!: string;

  @Field(() => String)
  gender!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  creatorPhoneNumber!: string;

  @Field(() => String)
  region: string;
}

@ObjectType()
class VictimList {

  @Field(() => [VictimData])
  victims?: VictimData[];
}

@Resolver(Victim)
export class VictimResolver {
  @Mutation(() => Boolean)
  async createVictim(
    @Arg("options", () => CreateVictimInput) options: CreateVictimInput,
    @Ctx() { firestore, req }: MyContext
  ) {
    const phoneNumber = req.session.phoneNumber!;
    let data = {} as Victim;
    data = { ...options, creatorPhoneNumber: phoneNumber };

    await firestore
      .collection(CollectionType.User)
      .doc(phoneNumber)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data() as User;
        if(!data)
          return false
        return data;
      });

    try {
      await firestore
        .collection(CollectionType.Victim)
        .add(data)
      return true;
    } catch (error) {
      console.log(error);
      
    }
    return false
  }

  @Mutation(() => Boolean)
  async updateVictim(
    @Arg("options", () => CreateVictimInput) options: CreateVictimInput,
    @Arg("victimId") victimId: string,
    @Ctx() { firestore, req }: MyContext
  ): Promise<Boolean> {
    const phoneNumber = req.session.phoneNumber!;
    let data = {} as Victim;
    data = { ...options, creatorPhoneNumber: phoneNumber };

    const result = await firestore
      .collection(CollectionType.User)
      .doc(phoneNumber)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data() as User;
        return data;
      });

    if (!result)
      //account not found in user
      return false;

    try {
      await firestore
        .collection(CollectionType.Victim)
        .doc(victimId)
        .update(data);
      return true;
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  @Mutation(() => Boolean)
  async deleteVictim(
    @Arg("victimId") victimId: string,
    @Ctx() { firestore, req }: MyContext
  ) {
    const phoneNumber = req.session.phoneNumber;
    const victimData = await firestore
      .collection(CollectionType.Victim)
      .doc(victimId)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.data() as Victim;
      });

    if (victimData.creatorPhoneNumber !== phoneNumber) {
      return false;
    }

    try {
      await firestore.collection(CollectionType.Victim).doc(victimId).delete();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Query(() => VictimList)
  async victims(@Ctx() { firestore }: MyContext): Promise<VictimList> {
    let victims: VictimData[] = [];

    await firestore
      .collection(CollectionType.Victim)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as VictimData;
          data.id = doc.id;
          victims.push(data);
        });
      });
    return {
      victims: victims!,
    };
  }

  @Query(() => VictimList)
  async victimsByRegion(  
    @Arg("region") region: string,
    @Ctx() { firestore, req }: MyContext
  ): Promise<VictimList> {
    const phoneNumber = req.session.phoneNumber!;
    let victims: VictimData[] = [];

    const data = await firestore
    .collection(CollectionType.Admin)
    .doc(phoneNumber)
    .get()
    .then((querySnapshot) =>{
      return querySnapshot.data();
    })
    if(data!)
      return {}

    await firestore
      .collection(CollectionType.Victim)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as VictimData;
          data.id = doc.id
          if (data.region === region) {
            victims.push(data);
          }
        });
      });
      return{
        victims: victims
      }
  }
}
