import { IonPage, IonList, IonItem, IonInput, IonButton, IonToast, IonCard, IonContent, useIonViewWillEnter } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../utils/nhost";
import WaveBlob from "../components/WaveBlob";
import { renderToStaticMarkup } from "react-dom/server";
import { useHistory } from "react-router";

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));

// Hook for bruker registration//
const RegisterUser = () => {
  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isNewUser, setisNewUser] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  
  const registerUser = async () => {
    setisNewUser(true);
    try {
      await auth.register(emailAddress, password);
      history.replace("/home")
    } catch (e) {
      console.error(e);
      setShowErrorToast(true);
    }

  }
  //Returnerer opprett profil side//
  return (
    <IonPage>
      <IonContentStyled>
        <CenterContainer>
          <PageTitle>Opprett profil</PageTitle>
          <LoginCard>
            <IonList>
              <IonItem>
                <IonInput placeholder="Epostadresse" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonInput placeholder="Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
              </IonItem>
            </IonList>
          </LoginCard>
          <IonButton onClick={registerUser}>
            Register</IonButton>
        </CenterContainer>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Bruker ekister allerede/mangler passord"
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonPage>
  )
};
// Login css// 
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

const CenterContainer = styled.div`
display: flex; 
justify-content: center; 
flex-direction: column; 
height: 100%;
`;

const PageTitle = styled.h1`
font-size: 3em; 
align-self: center;
color: #37323E;
font-family: 'Quicksand', sans-serif;
`;

export default RegisterUser; 