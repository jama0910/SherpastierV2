import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import Home from "./pages/Hjemmeside";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import NewPost from "./pages/Turforslag";
import { auth } from "./utils/nhost";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import RouterGuard from "./components/ReactGuard";
import RegisterUser from "./pages/RegisterUser";
import Turforslag from "./pages/Turforslag";
import Hjemmeside from "./pages/Hjemmeside";
import { home, informationCircle, list, map, personCircle } from "ionicons/icons";
/* Alle route pathene i applikasjonen med Nhost integrering */
const App: React.FC = () => (
  <NhostAuthProvider auth={auth}>
    <NhostApolloProvider
      auth={auth}
      gqlEndpoint={"https://hasura-80cf79c2.nhost.app/v1/graphql"}
      // Alle undersider//
    >
      <IonApp>
        <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/registeruser" component={RegisterUser} exact={true} />
            <Route path="/home" component={Hjemmeside } exact={true} />
            <RouterGuard path="/newpost" component={Turforslag} exact={true} />
            <Route path="/detail/:id" component={Detail} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/login">
            <IonIcon icon={home} />
            <IonLabel>Hjem</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={map} />
            <IonLabel>Kart</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/home">
            <IonIcon icon={list} />
            <IonLabel>Sti-Liste</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={informationCircle} />
            <IonLabel>SherpaInfo</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon icon={personCircle} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
          
                </IonTabBar>
                </IonTabs>
        </IonReactRouter>
  
      </IonApp>
    </NhostApolloProvider>
  </NhostAuthProvider>
);

export default App;
