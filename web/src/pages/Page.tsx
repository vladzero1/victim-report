import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { PageName } from "../components/Enums";
import { Home } from "../components/Layouts/Home";
import { Login } from "../components/Layouts/Login";
import { Register } from "../components/Layouts/Register";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  console.log(name)
  console.log(PageName.Home === name)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {name === PageName.Login ? <Login /> : null}
      {name === PageName.Home ? <Home /> : null}
      {name === PageName.Register ? <Register /> : null}
    </IonPage>
  );
};

export default Page;
