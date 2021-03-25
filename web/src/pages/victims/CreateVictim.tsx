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
  CreateVictimInput,
  useCreateVictimMutation,
  useMeLazyQuery,
} from "../../generated/graphql";
import { PageName, Gender } from "../../utils/Enums";

interface CreateVictimsProps {}

export const CreateVictim: React.FC<CreateVictimsProps> = ({}) => {
  const [createVictim] = useCreateVictimMutation();
  const [me, { data, loading}] = useMeLazyQuery();
  const genderList = [Gender.Male, Gender.Female];
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
            // errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              setAge(e.currentTarget.value?.toString()!);
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
            onClick={async ({}) => {
              me();
              const options: CreateVictimInput = {
                name: name,
                address: address,
                age: age,
                gender: gender,
                location: location,
                photo: photo,
                region: data?.me?.user?.region!,
              };
              if(!loading)
                await createVictim({ variables: { options: options } });
            }}
          >
            Create Victim
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
