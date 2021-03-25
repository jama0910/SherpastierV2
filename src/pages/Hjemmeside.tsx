// Inspirert av forelesningene//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonLabel,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TurPost from "../models/TurPost";
import PostCard from "../components/PostCard";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import PostListe from "../models/PostListe";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server";
import WaveBlob2 from "../components/WaveBlob2";
import { exitOutline, leaf } from "ionicons/icons";
import { auth } from "../utils/nhost";
import { walk } from "ionicons/icons";

const waveBlobString2 = encodeURIComponent(renderToStaticMarkup(<WaveBlob2 />));

const GET_POSTS = gql`
query {
  posts {
    id
    title
    description
    image_filename
    gradering
    user {
      id
      display_name

    }
  }
}

      
`;

const Hjemmeside = () => {
  let history = useHistory();
  const { loading, data } = useQuery<PostListe>(GET_POSTS);

  if (loading) {
    return <IonLabel>Laster...</IonLabel>;
  }

  const logout = async () => {
    try {
      await auth.logout();
      history.replace("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonButton onClick={logout}>
              <IonIcon icon={exitOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <SherpaToolbar >
          <PageTitle>
         Sherpastier<IonIcon icon={leaf} />
          </PageTitle>
          </SherpaToolbar>
          <IonButtons slot="end">
            <IonButton routerLink="/NewPost">+</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContentStyled fullscreen>
        {data?.posts.map((post) => (
          <Link
            style={{ textDecoration: "none" }}
            key={post.id}
            to={{
              pathname: `/detail/$(post.id)`,
              state: {
                post,
              },
            }}
          >
            <PostCard {...post} />
          </Link>
        ))}
      </IonContentStyled>
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --background: none;
  background-size: cover;
  background-color: white;
`;
const PageTitle = styled.h1`
font-size: 2em; 
align-self: center;
color: #37323E;
font-family: "Skema Pro News Medium"
--background: #AAD79A;
background: url("data:image/svg+xml, ${waveBlobString2}") no-repeat fixed;
`;
const SherpaToolbar = styled(IonToolbar)`
font-size: 1em; 
align-self: center;
color: #37323E;
font-family: "Skema Pro News Medium"

`;

export default Hjemmeside;
