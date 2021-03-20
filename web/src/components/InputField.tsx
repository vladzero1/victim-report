import { IonLabel, IonInput, IonItem } from "@ionic/react";
import React, { HTMLAttributes } from "react";

type InputFieldProps = HTMLAttributes<HTMLIonInputElement> & {
  label: string;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, ...props }) => {
  return (
    <IonItem>
      <IonLabel position="floating">{label}</IonLabel>
      {type === "password" ? (
        <IonInput {...props} type="password" />
      ) : (
        <IonInput {...props} />
      )}
    </IonItem>
  );
};

export default InputField;
