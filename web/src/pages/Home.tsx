import { IonPage } from '@ionic/react'
import React from 'react'
import { Layout } from '../components/Layout';
import { PageName } from '../utils/Enums';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <IonPage>
          <Layout name={PageName.Home}/>
        </IonPage>
    );
}