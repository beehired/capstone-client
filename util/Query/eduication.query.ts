import { gql, TypedDocumentNode } from "@apollo/client";

export const GetEducationByProfileID: TypedDocumentNode = gql`
  query GetAllEducationByProfileId($profileId: ID!) {
    getAllEducationByProfileId(profileID: $profileId) {
      educationID
      degree
      endMonth
      endYear
      school
      startMonth
      startYear
      study
    }
  }
`;

export const GetEducationById: TypedDocumentNode = gql`
  query GetEducationById($educationId: ID!) {
    getEducationById(educationID: $educationId) {
      educationID
      study
      startYear
      startMonth
      school
      endYear
      endMonth
      degree
    }
  }
`;
