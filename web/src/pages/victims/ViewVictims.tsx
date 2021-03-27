import {
  IonAvatar,
  IonButton,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { PageName } from "../../utils/Enums";
import { IsAuth } from "../../utils/useIsAuth";
import {
  AllVictimsDocument,
  useAllVictimsQuery,
  useDeleteVictimMutation,
  useMeQuery,
  useUpdateVictimMutation,
} from "../../generated/graphql";
import InputField from "../../components/InputField";
import { genderList } from "../../utils/constant";

export const ViewVictim: React.FC<{}> = ({}) => {
  const allVictimsQuery = useAllVictimsQuery();
  const meQuery = useMeQuery();
  const [updateVictim] = useUpdateVictimMutation();
  const [deleteVictim] = useDeleteVictimMutation();
  const [chosenId, setChosenId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [region, setRegion] = useState("");

  IsAuth();

  return (
    <IonPage>
      <Layout name={PageName.ViewVictims} />
      <IonContent>
        <IonList>
          {!allVictimsQuery.loading && !allVictimsQuery.data
            ? () => null
            : allVictimsQuery.data?.victims.victims.map((victim, index) => {
                return (
                  <IonItem key={index} lines="inset">
                    <IonAvatar>
                      <IonImg src={victim.photo}></IonImg>
                    </IonAvatar>
                    <IonLabel>
                      name: {victim.name} <br />
                      age : {victim.age} <br />
                      gender: {victim.gender} <br />
                      address: {victim.address} <br />
                      region: {victim.region} <br />
                      location: {victim.location}
                    </IonLabel>

                    {!meQuery.loading &&
                    meQuery.data?.me?.user?.phoneNumber ===
                      victim.creatorPhoneNumber ? (
                      <>
                        <IonButton
                          onClick={() => {
                            setChosenId(victim.id);
                            setName(victim.name);
                            setAddress(victim.address);
                            setAge(victim.age);
                            setGender(victim.gender);
                            setLocation(victim.location);
                            setPhoto(victim.photo);
                            setRegion(victim.region);
                            setModalBody("update");
                            setShowModal(true);
                          }}
                        >
                          edit
                        </IonButton>
                        <IonButton
                          onClick={() => {
                            setChosenId(victim.id);
                            setModalBody("delete");
                            setShowModal(true);
                          }}
                        >
                          delete
                        </IonButton>
                      </>
                    ) : null}
                  </IonItem>
                );
              })}
        </IonList>
      </IonContent>
      <IonModal isOpen={showModal} id="updateModal">
        <IonContent>
          {modalBody === "update" ? (
            <>
              <InputField
                label="Name"
                value={name}
                onInput={(e) => {
                  setName(e.currentTarget.value as string);
                }}
              />
              <InputField
                label="Age"
                type="number"
                value={age}
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
                    value={gender}
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
                label="Address"
                value={address}
                onInput={(e) => {
                  setAddress(e.currentTarget.value as string);
                }}
              />
              <InputField
                label="Location"
                value={location}
                onInput={(e) => {
                  setLocation(e.currentTarget.value as string);
                }}
              />
              <IonButton
                onClick={() => {
                  updateVictim({
                    variables: {
                      victimId: chosenId,
                      options: {
                        address: address,
                        age: age,
                        gender: gender,
                        location: location,
                        name: name,
                        photo: photo,
                        region: region,
                      },
                    },
                    refetchQueries:[{query: AllVictimsDocument}]
                  });
                  setShowModal(false);
                }}
              >
                Update
              </IonButton>
            </>
          ) : (
            <>
              <IonItem>
                <IonLabel>Are you sure to delete this victim?</IonLabel>
                <IonButton
                  onClick={() => {
                    console.log(chosenId);
                    deleteVictim({
                      variables: { victimId: chosenId },
                      refetchQueries: [{ query: AllVictimsDocument }],
                    });
                    setShowModal(false);
                  }}
                >
                  DELETE
                </IonButton>
              </IonItem>
            </>
          )}
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};
