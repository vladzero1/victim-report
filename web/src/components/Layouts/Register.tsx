import { IonContent, IonButton } from "@ionic/react";
import React from "react";
import { UserType } from "../Enums";
import InputField from "../InputField";
import InputSelection from "../InputSelection";

interface RegisterProps {}
const list = [UserType.Admin, UserType.User];
export const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <IonContent>
      {/* <form className="ion-padding"> */}
        <InputField label="Phone Number" />
        <InputField label="Password" type="password" />
        <InputField label="Confirm Password" type="password" />
        <InputSelection category="UserType" values={list}></InputSelection>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Register
        </IonButton>
      {/* </form> */}
    </IonContent>
  );
};
