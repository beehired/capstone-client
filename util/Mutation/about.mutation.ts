import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateAbout: TypedDocumentNode = gql`
  mutation CreateAbout($profileId: ID!, $input: AboutInput!) {
    createAbout(profileID: $profileId, input: $input) {
      ... on about {
        aboutID
        bio
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const UpdateAbout: TypedDocumentNode = gql`
  mutation UpdateAbout($aboutId: ID!, $bio: String!) {
    updateAbout(aboutID: $aboutId, bio: $bio) {
      aboutID
      bio
    }
  }
`;

export const DeleteAbout: TypedDocumentNode = gql`
  mutation DeleteAbout($aboutId: ID!) {
    deleteAbout(aboutID: $aboutId) {
      aboutID
    }
  }
`;
