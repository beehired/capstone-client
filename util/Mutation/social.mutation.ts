import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateSocialLink: TypedDocumentNode = gql`
  mutation CreateSocialLink(
    $profileId: ID!
    $instagram: String
    $facebook: String
    $github: String
    $x: String
    $web: String
  ) {
    createSocialLink(
      profileID: $profileId
      instagram: $instagram
      facebook: $facebook
      Github: $github
      X: $x
      Web: $web
    ) {
      socialID
    }
  }
`;

export const UpdateSocialLink: TypedDocumentNode = gql`
  mutation UpdateSocialLink(
    $socialId: ID!
    $facebook: String
    $github: String
    $instagram: String
    $web: String
    $x: String
  ) {
    updateSocialLink(
      socialID: $socialId
      facebook: $facebook
      Github: $github
      instagram: $instagram
      Web: $web
      X: $x
    ) {
      socialID
    }
  }
`;
