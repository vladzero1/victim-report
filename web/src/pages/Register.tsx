import { IonContent, IonButton, IonPage } from "@ionic/react";
import React from "react";
import InputField from "../components/InputField";
import InputSelection from "../components/InputSelection";
import { Layout } from "../components/Layout";
import { PageName, UserType } from "../utils/Enums";

interface RegisterProps {}
const list = [UserType.Admin, UserType.User];
export const Register: React.FC<RegisterProps> = ({}) => {
  // const [, usePhoneN] = useState('');
  return (
    <>
      <IonPage>
        <Layout name={PageName.Register}/>
        <IonContent>
          {/* <form className="ion-padding"> */}
          <InputField
            label="Phone Number"
            onChange={(input: any) => {
              console.log(input.target.values);
              // usePhoneN(input.target.values);
            }}
          />
          <InputField label="Password" type="password" />
          <InputField label="Confirm Password" type="password" />
          <InputSelection category="UserType" values={list}></InputSelection>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Register
          </IonButton>
          {/* </form> */}
        </IonContent>
      </IonPage>
    </>
  );
};
