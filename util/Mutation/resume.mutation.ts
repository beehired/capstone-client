import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateResume: TypedDocumentNode = gql`
  mutation CreateResume($profileId: ID!, $file: Upload) {
    createResume(profileID: $profileId, file: $file) {
      ... on resume {
        resumeID
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const DeleteResume: TypedDocumentNode = gql`
  mutation DeleteResume($resumeId: ID!) {
    deleteResume(resumeID: $resumeId) {
      resumeID
    }
  }
`;
