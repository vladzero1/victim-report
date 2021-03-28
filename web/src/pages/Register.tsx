import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonRouter
} from "@ionic/react";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  MeDocument,
  useRegisterAdminMutation,
  useRegisterUserMutation
} from "../generated/graphql";
import { PageName, UserType } from "../utils/Enums";
import { fieldIsNotEmpty, FormError } from "../utils/validation";

interface RegisterProps {}
const list = [UserType.Admin, UserType.User];
export const Register: React.FC<RegisterProps> = ({}) => {
  const router = useIonRouter();
  const [userTypeValue, setUserTypeValue] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const [registerAdmin] = useRegisterAdminMutation();
  const [{ errField, errMsg }, setErr] = useState<FormError>({
    errField: "",
    errMsg: "",
  });
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const resetErr = () => {
    setErr({
      errField: "",
      errMsg: "",
    });
  };
  return (
    <>
      <IonPage>
        <Layout name={PageName.Register} />
        <IonContent>
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
          <InputField
            label="Username"
            errMsg={errField === "username" ? errMsg : null}
            onInput={(e) => {
              setUsername(e.currentTarget.value?.toString()!);
              resetErr();
            }}
          />
          <InputField
            label="Phone Number"
            errMsg={errField === "phone number" ? errMsg : null}
            onInput={(e) => {
              setPhoneNumber(e.currentTarget.value?.toString()!);
              resetErr();
            }}
          />
          <InputField
            label="Password"
            type="password"
            errMsg={errField === "password" ? errMsg : null}
            onInput={(e) => {
              setPassword(e.currentTarget.value?.toString()!);
              resetErr();
            }}
          />
          <InputField
            label="Confirm Password"
            type="password"
            errMsg={errField === "confirm password" ? errMsg : null}
            onInput={(e) => {
              setConfirmPassword(e.currentTarget.value?.toString()!);
              resetErr();
            }}
          />
          {userTypeValue === UserType.User ? (
            <InputField
              label="Region"
              onInput={(e) => {
                setRegion(e.currentTarget.value?.toString()!);
                resetErr();
              }}
            />
          ) : null}
          <IonButton
            className="ion-margin-top"
            type="submit"
            expand="block"
            onClick={() => {
              let err = fieldIsNotEmpty("username", username);
              console.log(err);
              if (err) {
                setErr(err);
                return;
              }
              err = fieldIsNotEmpty("phone number", phoneNumber);
              if (err) {
                setErr(err);
                return;
              }
              err = fieldIsNotEmpty("password", password);
              if (err) {
                setErr(err);
                return;
              }
              err = fieldIsNotEmpty("confirm password", confirmPassword);
              if (err) {
                setErr(err);
                return;
              }
              if (userTypeValue === UserType.User) {
                err = fieldIsNotEmpty("region", region);
                if (err) {
                  setErr(err);
                  return;
                }
              }
              if (password !== confirmPassword) {
                setErr({
                  errField: "confirm password",
                  errMsg: "The password is different",
                });
                return;
              }
              if (userTypeValue === UserType.Admin) {
                const options = {
                  phoneNumber: phoneNumber,
                  password: password,
                };
                registerAdmin({
                  variables: {
                    username: username,
                    options: options,
                  },
                  refetchQueries: [{ query: MeDocument }],
                });
                router.push("/");
              }
              if (userTypeValue === UserType.User) {
                const options = {
                  phoneNumber: phoneNumber,
                  password: password,
                };
                registerUser({
                  variables: {
                    username: username,
                    region: region,
                    options: options,
                  },
                  refetchQueries: [{ query: MeDocument }],
                });
                router.push("/");
              }
            }}
          >
            Register
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
