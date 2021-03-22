import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

interface LayoutProps {
  name: string;
}

export const Layout: React.FC<LayoutProps> = ({ name }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{name}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
