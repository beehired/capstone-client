import { TypedDocumentNode, gql } from "@apollo/client";

export const GetMyProjectByUserId: TypedDocumentNode = gql`
  query Query($userId: ID!, $input: PaginationInput!, $status: String!) {
    getUserProjectOrganizer(userID: $userId, input: $input, status: $status) {
      item {
        projectOrganizerID
        title
        status
        startDate
        description
        endDate
        amount
        createdAt
        company {
          companyID
          companyName
        }
      }
      currentPage
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
    }
  }
`;

export const GetMyProjectCompany: TypedDocumentNode = gql`
  query GetCompanyProjects(
    $companyId: ID!
    $input: PaginationInput!
    $search: String!
    $orderBy: String!
  ) {
    getCompanyProjects(
      companyID: $companyId
      input: $input
      search: $search
      orderBy: $orderBy
    ) {
      item {
        projectOrganizerID
        title
        description
        status
        startDate
        endDate
        amount
        createdAt
        user {
          userID
          myProfile {
            firstname
            lastname
          }
        }
      }
      totalItems
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
    }
  }
`;

export const GetProjectOrganizerById: TypedDocumentNode = gql`
  query GetProjectOrganizedID($projectOrganizerId: ID!) {
    getProjectOrganizedID(projectOrganizerID: $projectOrganizerId) {
      title
      status
      startDate
      endDate
      createdAt
      amount
      user {
        myProfile {
          firstname
          lastname
        }
      }
    }
  }
`;

export const GenerateProjectOrganizer: TypedDocumentNode = gql`
  mutation GenerateProjectOrganizer(
    $userId: ID!
    $startDate: String
    $endDate: String
  ) {
    generateProjectOrganizer(
      userID: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      projectOrganizerID
      title
      amount
      startDate
      status
      endDate
      createdAt
      updatedAt
      company {
        companyName
      }
    }
  }
`;
