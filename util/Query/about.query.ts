import { gql, TypedDocumentNode } from "@apollo/client";

export const GetMyAboutByProfileID: TypedDocumentNode = gql`
  query GetAboutByProfileID($profileId: ID!) {
    getAboutByProfileID(profileID: $profileId) {
      aboutID
      bio
      createdAt
    }
  }
`;

export const GetMyAboutById: TypedDocumentNode = gql`
  query GetAboutById($aboutId: ID!) {
    getAboutById(aboutID: $aboutId) {
      bio
      aboutID
    }
  }
`;
