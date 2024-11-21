import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateApplication: TypedDocumentNode = gql`
  mutation CreateApplication($userId: ID!, $jobPostId: ID!, $resumeId: ID!) {
    createApplication(
      userID: $userId
      jobPostID: $jobPostId
      resumeID: $resumeId
    ) {
      ... on application {
        applicationID
        id
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const UpdateApplication: TypedDocumentNode = gql`
  mutation UpdateApplicationStatus($applicationId: ID!, $status: String!) {
    updateApplicationStatus(applicationID: $applicationId, status: $status) {
      applicationID
    }
  }
`;

export const GenerateReportApplicant: TypedDocumentNode = gql`
  mutation GenerateApplicantByJobPostID(
    $jobPostId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    generateApplicantByJobPostID(
      jobPostID: $jobPostId
      startDate: $startDate
      endDate: $endDate
    ) {
      applicationID
      id
      status
      createdAt
      score {
        score
      }
      resume {
        resume
      }
      user {
        myProfile {
          firstname
          lastname
        }
      }
    }
  }
`;
