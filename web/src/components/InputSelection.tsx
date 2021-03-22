import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";

type InputSelectionProps = {
  category: string;
  values: string[];
};
//incomplete. cannot get the value from outside
const InputSelection: React.FC<InputSelectionProps> = ({
  category,
  values,
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
