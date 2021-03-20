import {
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonContent,
} from "@ionic/react";
import React from "react";
import { UserType } from "../Enums";
import InputField from "../InputField";
import InputSelection from "../InputSelection";

interface LoginProps {}
const list = [UserType.Admin, UserType.User];
export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <>
    <IonContent>
      {/* <form className="ion-padding"> */}
        <InputField label="Phone Number" />
        <InputField label="Password" type="password" />
        <InputSelection category="UserType" values={list} />
        <IonItem lines="none">
          <IonLabel>Remember me</IonLabel>
          <IonCheckbox defaultChecked={true} slot="start" />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Login
        </IonButton>
      {/* </form> */}
    </IonContent>
    </>
  );
};
