import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateProfilePicture: TypedDocumentNode = gql`
  mutation CreateAvatar($profileId: ID!, $file: Upload!) {
    createAvatar(profileID: $profileId, file: $file) {
      ... on media {
        mediaID
        media
        createdAt
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;
