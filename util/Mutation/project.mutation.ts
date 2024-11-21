import { gql, TypedDocumentNode } from "@apollo/client";

export const UpdateProjectDetails: TypedDocumentNode = gql`
  mutation UpdateProjectDetails(
    $projectOrganizerId: ID!
    $title: String!
    $amount: Int!
    $startDate: Date!
    $endDate: Date!
    $userId: ID!
  ) {
    updateProjectDetails(
      projectOrganizerID: $projectOrganizerId
      title: $title
      amount: $amount
      startDate: $startDate
      endDate: $endDate
      userID: $userId
    ) {
      projectOrganizerID
    }
  }
`;

export const UpdatePRojectStatus: TypedDocumentNode = gql`
  mutation UpdateProjectStatus(
    $projectOrganizerId: ID!
    $userId: ID!
    $status: String!
  ) {
    updateProjectStatus(
      projectOrganizerID: $projectOrganizerId
      userID: $userId
      status: $status
    ) {
      projectOrganizerID
    }
  }
`;
