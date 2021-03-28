import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Layout } from "../../components/Layout";
import {
  AllVictimsDocument,
  AllVictimsQuery,
  CreateVictimInput,
  useCreateVictimMutation,
  useMeQuery,
} from "../../generated/graphql";
import { genderList } from "../../utils/constant";
import { PageName } from "../../utils/Enums";

interface CreateVictimsProps {}

export const CreateVictim: React.FC<CreateVictimsProps> = ({}) => {
  const [createVictim] = useCreateVictimMutation();
  const { data, loading } = useMeQuery();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      <IonPage>
        <Layout name={PageName.CreateVictims} />
        <IonContent>
          <InputField
            label="Name"
            // errMsg={errField === FieldName.PhoneNumber ? errMsg : null}
            onInput={(e) => {
              setName(e.currentTarget.value?.toString()!);
            }}
          />
          <InputField
            label="Age"
            type="number"
            // errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              if (typeof e.currentTarget.value === "string")
                setAge(parseInt(e.currentTarget.value));
              else {
                setAge(e.currentTarget.value as number);
              }
            }}
          />
          <IonList>
            <IonItem>
              <IonLabel>Gender</IonLabel>
              <IonSelect
                placeholder="Select One"
                onIonChange={(e) => {
                  setGender(e.detail.value);
                }}
              >
                {genderList.map((value) => (
                  <IonSelectOption value={value} key={value}>
                    {value}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
          <InputField
            label="Photo"
            // errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              setPhoto(e.currentTarget.value?.toString()!);
            }}
          />
          <InputField
            label="Address"
            // errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              setAddress(e.currentTarget.value?.toString()!);
            }}
          />
          <InputField
            label="Location"
            // errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              setLocation(e.currentTarget.value?.toString()!);
            }}
          />
          <IonButton
            className="ion-margin-top"
            type="submit"
            expand="block"
            routerLink="/victims/view"
            onClick={async ({}) => {
              console.log(data?.me?.user?.region);
              console.log(data);
              const options: CreateVictimInput = {
                name: name,
                address: address,
                age: age,
                gender: gender,
                location: location,
                photo: photo,
                region: data?.me?.user?.region!,
              };
              console.log(options);
              if (!loading)
                await createVictim({
                  variables: { options: options },
                  update: (store, { data }) => {
                    const victimsData = store.readQuery<AllVictimsQuery>({
                      query: AllVictimsDocument,
                    });

                    store.writeQuery<AllVictimsQuery>({
                      query: AllVictimsDocument,
                      data: {
                        victims: {
                          ...victimsData?.victims,
                          victims: [
                            ...victimsData!.victims.victims,
                            data!.createVictim,
                          ],
                        },
                      },
                    });
                  },
                });
            }}
          >
            Create Victim
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
