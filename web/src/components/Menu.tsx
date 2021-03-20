import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle
} from '@ionic/react';
import { bookmarkOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { PageName } from './Enums';
import './Menu.css';


interface AppPage {
  url: string;
  // iosIcon: string;
  // mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: PageName.Home,
    url: '/page/home',
    // iosIcon: mailOutline,
    // mdIcon: mailSharp
  },
  {
    title: PageName.Login,
    url: '/page/login',
    // iosIcon: paperPlaneOutline,
    // mdIcon: paperPlaneSharp
  },
  {
    title: PageName.Register,
    url: '/page/register',
    // iosIcon: heartOutline,
    // mdIcon: heartSharp
  },
  // {
  //   title: 'Archived',
  //   url: '/page/Archived',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp
  // },
  // {
  //   title: 'Trash',
  //   url: '/page/Trash',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp
  // },
  // {
  //   title: 'Spam',
  //   url: '/page/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  {/* <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} /> */}
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
