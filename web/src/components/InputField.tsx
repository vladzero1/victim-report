import { IonLabel, IonInput, IonItem } from "@ionic/react";
import React, { HTMLAttributes } from "react";
import { TextFieldTypes } from "../utils/Types";

type InputFieldProps = HTMLAttributes<HTMLIonInputElement> & {
  label: string;
  type?: TextFieldTypes;
  value?: string | number | null | undefined;
  errMsg?: string | null;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type="text",
  errMsg = null,
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

        <IonInput
          {...props}
          type={type}
          onChange={(e) => {
            props.value = e.currentTarget.value;
          }}
        />
    </IonItem>
  );
};

export default InputField;
