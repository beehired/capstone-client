import { gql, TypedDocumentNode } from "@apollo/client";

export const GetMyResumeList: TypedDocumentNode = gql`
  query GetAllResumyByProfileID($profileId: ID!) {
    getAllResumyByProfileID(profileID: $profileId) {
      resumeID
      title
      resume
      createdAt
    }
  }
`;
