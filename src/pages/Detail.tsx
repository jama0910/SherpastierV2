// Inspirert av forelesningene//
import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonIcon,
} from "@ionic/react";
import PostCard from "../components/PostCard";
import TurPost from "../models/TurPost";
import { gql, useMutation } from "@apollo/client";
import { auth } from "../utils/nhost";
import { trashBinOutline, walk } from "ionicons/icons";

const INSERT_COMMENT = gql`
  mutation InsertComment($comment: comments_insert_input!) {
    insert_comments_one(object: $comment) {
      post_id
      user_id
      text
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($post_id: Int!) {
    delete_comments(where: { post_id: { _eq: $post_id } }) {
      affected_rows
    }
    delete_posts_by_pk(id: $post_id) {
      id
    }
  }
`;

const Detail = (props: any) => {
  const post: TurPost = props.location?.state?.post;

  const [insertCommentsMutation] = useMutation(INSERT_COMMENT);
  const [text, setText] = useState<string>("");
  const [deletePostMutation] = useMutation(DELETE_POST);

  if (!post) {
    return <div />;
  }

  //Holder på med å implementere kommentar mulighet. Kan gjøre det indirekte.
  const insertComment = async () => {
    try {
      await insertCommentsMutation({
        variables: {
          comment: {
            post_id: post?.id,
            user_id: auth.getClaim("x-hasura-user-id"),
            text,
          },
        },
      });
    } catch {
      console.log("Feil");
    }
  };

  const deletePost = async () => {
    try {
      await deletePostMutation({
        variables: {
          post_id: post.id,
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>
            Detaljer
            <IonIcon icon={walk} />
          </IonTitle>
          {post.user.id === auth.getClaim("x-hasura-user-id") && (
            <IonButtons slot="end">
              <IonButton onClick={deletePost} />
              <IonIcon color="danger" icon={trashBinOutline} />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PostCard {...post} />
        <IonCard>
          <IonList>
            {post.comments?.map((comment, i) => (
              <IonItem key={i}>
                {/*                  <IonAvatar slot="start">
                    <img src={comment.profileImageURL} />
                  </IonAvatar> */}
                {
                  <IonLabel>
                    {/*       <h3>{comment.date}</h3> */}
                    <h2>{comment.user.display_name}</h2>
                    <p>{comment.text}</p>
                  </IonLabel>
                }
              </IonItem>
            ))}
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem>
              <IonInput
                placeholder="Skriv kommentar"
                onIonInput={(e: any) => setText(e.target.value)}
              />
            </IonItem>
          </IonList>
          <IonButton color="success" onClick={insertComment}>
            Legg til kommentar
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Detail;
