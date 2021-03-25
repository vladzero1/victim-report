import {  IonAvatar, IonButton, IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { PageName } from "../../utils/Enums";
import { IsAuth } from "../../utils/useIsAuth";
import { useAllVictimsQuery } from "../../generated/graphql";

export const ViewVictim: React.FC<{}> = ({}) => {
  const { data, loading } = useAllVictimsQuery();
  IsAuth();
  return (
    <IonPage>
      <Layout name={PageName.ViewVictims} />
      <IonContent>
        <IonList>
          {!loading && !data
            ? () => null
            : data?.victims.victims.map((victim, index) => {
                {
                  console.log(victim);
                }

                return (
                  <IonItem key={index} lines="inset">
                    <IonAvatar>{victim.photo}</IonAvatar>
                    <IonLabel>
                      name: {victim.name}
                      <br />
                      age : {victim.age}
                      <br />
                      gender: {victim.gender} <br />
                      address: {victim.address} <br />
                      region: {victim.region} <br />
                      location: {victim.location}
                    </IonLabel>
                    <IonButton>edit</IonButton>
                    <IonButton>delete</IonButton>
                  </IonItem>
                );
              })}
          {/* <IonItem>test</IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
