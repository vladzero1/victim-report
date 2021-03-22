import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  PhoneNumberPasswordInput,
  useLoginAdminMutation,
  useLoginUserMutation,
} from "../generated/graphql";
import { FieldName, PageName, UserType } from "../utils/Enums";

interface LoginProps {}
const list = [UserType.Admin, UserType.User];
export const Login: React.FC<LoginProps> = ({}) => {
  const router = useIonRouter();
  const [loginUser] = useLoginUserMutation();
  const [loginAdmin, adminData] = useLoginAdminMutation();
  const [userTypeValue, setUserTypeValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errField, setErrField] = useState("");
  const [] = useLoginAdminMutation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <IonPage>
        <Layout name={PageName.Login} />
        <IonContent>
          <InputField
            label="Phone Number"
            errMsg={errField === FieldName.PhoneNumber ? errMsg : null}
            onInput={(e) => {
              setPhoneNumber(e.currentTarget.value?.toString()!);
            }}
          />
          {/* inputField component is bugged cannot take value if it is password type*/}
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            {errMsg !== null ? (
              <IonLabel position="floating" color="danger">
                {errMsg}
              </IonLabel>
            ) : null}
            <IonInput
              type="password"
              onInput={(e) => {
                setPassword(e.currentTarget.value?.toString()!);
              }}
            />
          </IonItem>
          <IonList>
            {/* input selection component is bugged cannot take value*/}
            <IonItem>
              <IonLabel>UserType</IonLabel>
              <IonSelect
                value={userTypeValue}
                placeholder="Select One"
                onIonChange={(e) => {
                  setUserTypeValue(e.detail.value);
                }}
              >
                {list.map((value) => (
                  <IonSelectOption value={value} key={value}>
                    {value}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>

          <IonItem lines="none">
            <IonLabel>Remember me</IonLabel>
            <IonCheckbox defaultChecked={true} slot="start" />
          </IonItem>
          <IonButton
            className="ion-margin-top"
            type="submit"
            expand="block"
            onClick={async ({}) => {
              const options: PhoneNumberPasswordInput = {
                phoneNumber: phoneNumber,
                password: password,
              };
              console.log(`password=${password}`);
              if (userTypeValue === UserType.User) {
                let response = await loginUser({
                  variables: { options: options },
                });
                if (response!.data?.loginUser.errors) {
                  response.data?.loginUser.errors.map((value) => {
                    console.log(value);
                    setErrField(value.field);
                    setErrMsg(value.message);
                  });
                } else {
                  console.log(response.data?.loginUser.user);
                  router.push("/");
                }
              }
              if (userTypeValue === UserType.Admin) {
                let response = await loginAdmin({
                  variables: { options: options },
                });
                if (response!.data?.loginAdmin.errors) {
                  response.data?.loginAdmin.errors.map((value) => {
                    console.log(value);
                    setErrField(value.field);
                    setErrMsg(value.message);
                  });
                } else {
                  console.log(adminData.data);
                  router.push("/");
                }
              }
            }}
          >
            Login
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
