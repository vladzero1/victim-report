import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { HTMLAttributes, useState } from "react";

type InputSelectionProps = {
  category: string;
  values: string[];
  value?: string;
} & HTMLAttributes<HTMLIonInputElement>;
//incomplete. cannot get the value from outside
const InputSelection: React.FC<InputSelectionProps> = ({
  category,
  values,
  value
}) => {
  const [categoryValue, setCategoryValue] = useState("");
  return (
    <IonList>
      <IonItem>
        <IonLabel>{category}</IonLabel>
        <IonSelect
          value={categoryValue}
          placeholder="Select One"
          onIonChange={(e) => {
            setCategoryValue(e.detail.value);
            value = e.detail.value
            console.log(value);
          }}
        >
          {values.map((value) => (
            <IonSelectOption value={value} key={value}>
              {value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};
export default InputSelection;
