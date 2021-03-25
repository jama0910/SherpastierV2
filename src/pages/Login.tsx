// Inspirert av forelesningene//
import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  useIonViewWillEnter,
  IonFabButton,
  IonIcon,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/nhost";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server";
import { arrowForwardCircle } from "ionicons/icons";
import WaveBlob from "../components/WaveBlob2";
import { leaf } from "ionicons/icons";

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));

const Login = () => {
  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
// Hvis brukeren er logget inn blir de sendt til hjemmesiden"
  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace("/home");
    }
  });
// Autoriserer brukere først hvis feil kommer det opp error//
  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.login(emailAddress, password);
      setIsAuthenticating(false);
      history.replace("/home");
    } catch (exception) {
      console.error(exception);
      setIsAuthenticating(false);
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonContentStyled>
        <CenterContainer>
          <PageTitle>
            Sherpastier <IonIcon icon={leaf} />
          </PageTitle>
          <LoginCard>
            <IonList>
              <IonItem>
                <IonInput
                  placeholder="Epostadresse"
                  onIonInput={(e: any) => setEmailAddress(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Passord"
                  type="password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                />
              </IonItem>
            </IonList>
          </LoginCard>
          <LoginButton onClick={authenticateUser}>
            {isAuthenticating ? (
              <IonSpinner name="crescent" />
            ) : (
              <IonIcon icon={arrowForwardCircle} />
            )}
          </LoginButton>
          <IonButton onClick={() => history.replace("/registeruser")}>
            Register bruker?
          </IonButton>
        </CenterContainer>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Feil brukernavn/passord"
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonPage>
  );
};

const LoginCard = styled(IonCard)`
  padding: 20px;
  background-color: white;
`;

const IonContentStyled = styled(IonContent)`
  --background: none;
  background: url("data:image/svg+xml, ${waveBlobString}") no-repeat fixed;
  background-size: cover;
  background-color: white;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  align-self: center;
  color: #37323e;
  font-family: "Quicksand", sans-serif;
`;

const LoginButton = styled(IonFabButton)`
  --background: #37323e;
  align-self: center;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export default Login;
