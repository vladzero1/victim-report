import { IonLabel, IonInput, IonItem } from "@ionic/react";
import React, { HTMLAttributes } from "react";

type InputFieldProps = HTMLAttributes<HTMLIonInputElement> & {
  label: string;
  type?: string;
  value?: string | number | null | undefined;
  errMsg?: string | null;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  errMsg,
  ...props
}) => {
  return (
    <IonItem>
      <IonLabel position="floating">{label}</IonLabel>
      {errMsg !== null ? (
        <IonLabel position="floating" color="danger">
          {errMsg}
        </IonLabel>
      ) : null}

      {type === "password" ? (
        <IonInput
          {...props}
          type="password"
          onInput={(e) => {
            props.value = e.currentTarget.value;
          }}
        />
      ) : (
        <IonInput
          {...props}
          onChange={(e) => {
            props.value = e.currentTarget.value;
          }}
        />
      )}
    </IonItem>
  );
};

export default InputField;
