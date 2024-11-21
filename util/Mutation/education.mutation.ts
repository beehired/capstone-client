import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateEducationBackground: TypedDocumentNode = gql`
  mutation CreateEducationBackground($profileId: ID!, $input: EducationInput!) {
    createEducationBackground(profileID: $profileId, input: $input) {
      ... on ErrorObject {
        code
        message
      }
      ... on education {
        educationID
      }
    }
  }
`;

export const UpdateEducationBackground: TypedDocumentNode = gql`
  mutation Mutation($educationId: ID!, $input: EducationInput) {
    updateEducationBackground(educationID: $educationId, input: $input) {
      educationID
    }
  }
`;
export const DeleteEducationBackground: TypedDocumentNode = gql`
  mutation DeleteEducationBackground($educationId: ID!) {
    deleteEducationBackground(educationID: $educationId) {
      educationID
    }
  }
`;
