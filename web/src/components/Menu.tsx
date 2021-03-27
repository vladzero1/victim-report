import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import React from "react";
import { useLocation } from "react-router";
import { useMeQuery } from "../generated/graphql";
import { PageName } from "../utils/Enums";
import "./Menu.css";

interface AppPage {
  url: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: PageName.Home,
    url: "/home",
  },
  {
    title: PageName.Login,
    url: "/login",
  },
  {
    title: PageName.Register,
    url: "/register",
  },
  {
    title: PageName.ViewVictims,
    url: "/victims/view",
  },
  {
    title: PageName.CreateVictims,
    url: "/victims/create",
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { data, loading } = useMeQuery();
  let body = null;
  let header = null;
  //still loading
  if (loading) {
    //not Logged in
  } else if (!data?.me && !loading) {
    header = <IonHeader key="header">Menu</IonHeader>;
    body = appPages.map((appPage, index) => {
      return (
        <IonItem
          className={location.pathname === appPage.url ? "selected" : ""}
          routerLink={appPage.url}
          routerDirection="none"
          lines="none"
          detail={false}
          key={index}
        >
          <IonLabel>{appPage.title}</IonLabel>
        </IonItem>
      );
    });
    //logged in
  } else {
    header = (
      <IonHeader key="header">
        Welcome,
        <br />
        {data?.me?.user !== null
          ? data!.me?.user?.username
          : data.me.admin?.username}
      </IonHeader>
    );
    body = appPages.map((appPage, index) => {
      if (appPage.url === "/login" || appPage.url === "/register") {
        return null;
      } else {
        return (
          <IonItem
            key={index}
            className={location.pathname === appPage.url ? "selected" : ""}
            routerLink={appPage.url}
            routerDirection="none"
            lines="none"
            detail={false}
          >
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
        );
      }
    });
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        {header}
        <IonList key="Menu">
          <IonMenuToggle key="MenuToogle">{body}</IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
