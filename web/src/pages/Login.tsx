import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import InputField from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  MeDocument,
  PhoneNumberPasswordInput,
  useLoginAdminMutation,
  useLoginUserMutation,
} from "../generated/graphql";
import { FieldName, PageName, UserType } from "../utils/Enums";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const list = [UserType.Admin, UserType.User];
  const router = useIonRouter();
  const history = useHistory();
  const [loginUser] = useLoginUserMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const [userTypeValue, setUserTypeValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errField, setErrField] = useState("");
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
          <InputField
            label="Password"
            type="password"
            errMsg={errField === FieldName.Password ? errMsg : null}
            onInput={(e) => {
              setPassword(e.currentTarget.value?.toString()!);
            }}
          />
          <IonList>
            <IonItem>
              <IonLabel>User Type</IonLabel>
              <IonSelect
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
              if (userTypeValue === UserType.User) {
                let response = await loginUser({
                  variables: { options: options },
                  refetchQueries: [{ query: MeDocument }],
                });
                if (response!.data?.loginUser.errors) {
                  response.data?.loginUser.errors.map((value) => {
                    setErrField(value.field);
                    setErrMsg(value.message);
                  });
                } else {
                  if (router.routeInfo.pathname !== "/login") {
                    router.goBack();
                  }
                  history.push("/");
                }
              }
              if (userTypeValue === UserType.Admin) {
                let response = await loginAdmin({
                  variables: { options: options },
                  refetchQueries: [{ query: MeDocument }],
                });
                if (response!.data?.loginAdmin.errors) {
                  response.data?.loginAdmin.errors.map((value) => {
                    setErrField(value.field);
                    setErrMsg(value.message);
                  });
                } else {
                  if (router.routeInfo.pathname !== "/login") {
                    router.goBack();
                  }
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
