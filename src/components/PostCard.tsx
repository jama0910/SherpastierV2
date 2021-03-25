// Inspirert av forelesningene//
import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonContent } from "@ionic/react";
import TurPost from "../models/TurPost";
import styled from "styled-components";
import WaveBlob2 from "../components/WaveBlob2";
import { renderToStaticMarkup } from "react-dom/server";

// Alle innlegger postet//
const waveBlobString2 = encodeURIComponent(renderToStaticMarkup(<WaveBlob2 />));

const PostCard = ({ id, title, description, user, image_filename,gradering }: TurPost) => {
  return (
    <IonCard>
      <img src={`https://backend-80cf79c2.nhost.app/storage/o/public/${image_filename}`} />
      <IonCardHeader>
        <IonCardSubtitle>
          @ {user.display_name} &bull; 
            
                </IonCardSubtitle>
        <IonCardTitle>
          {title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description}
      </IonCardContent>
         <IonCardContent>
        {gradering}
      </IonCardContent>
    </IonCard>
  )
}
const IonContentStyled = styled(IonContent)`
  --background: none;
  background: url("data:image/svg+xml, ${waveBlobString2}") no-repeat fixed;
  background-size: cover;
  background-color: white;
`;

export default PostCard;