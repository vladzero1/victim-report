import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { bookmarkOutline } from "ionicons/icons";
import { useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { PageName } from "../utils/Enums";
import "./Menu.css";

interface AppPage {
  url: string;
  // iosIcon: string;
  // mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: PageName.Home,
    url: "/home",
    // iosIcon: mailOutline,
    // mdIcon: mailSharp
  },
  {
    title: PageName.Login,
    url: "/login",
    // iosIcon: paperPlaneOutline,
    // mdIcon: paperPlaneSharp
  },
  {
    title: PageName.Register,
    url: "/register",
    // iosIcon: heartOutline,
    // mdIcon: heartSharp
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();
  const { data, loading } = useMeQuery();
  let body = null;
  let header = null;
  //still loading
  if (loading) {
    console.log(`loading = ${loading}`);
    //not Logged in
  } else if (!data?.me) {
    console.log(`not logged`)
    body = appPages.map((appPage, index) => {
      return (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem
            className={location.pathname === appPage.url ? "selected" : ""}
            routerLink={appPage.url}
            routerDirection="none"
            lines="none"
            detail={false}
          >
            {/* <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} /> */}
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      );
    });
    //logged in
  } else {
    console.log(`logged in= ${data}`);

    header = (
      <>
        <IonListHeader>Welcome</IonListHeader>
        <IonListHeader>
          {data?.me?.user !== null
            ? data!.me?.user?.username
            : data.me.admin?.username}
        </IonListHeader>
      </>
    );
    body = appPages.map((appPage, index) => {
      return (
        <IonMenuToggle key={index} autoHide={false}>
          {appPage.url === "/login" || appPage.url === "/register" ? null : (
            <IonItem
              className={location.pathname === appPage.url ? "selected" : ""}
              routerLink={appPage.url}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {/* <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} /> */}
              <IonLabel>{appPage.title}</IonLabel>
            </IonItem>
          )}
        </IonMenuToggle>
      );
    });
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {header}
          <IonListHeader>Menu</IonListHeader>
          {body}
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
