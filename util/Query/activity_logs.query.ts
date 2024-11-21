import { TypedDocumentNode, gql } from "@apollo/client";

export const GetMyActivityLogs: TypedDocumentNode = gql`
  query Item($userId: ID!, $input: PaginationInput!) {
    getUserActivityLogs(userID: $userId, input: $input) {
      item {
        logsID
        title
        description
        createdAt
        updatedAt
      }
      hasPrevPage
      hasNextPage
      currentPage
      totalItems
      totalPages
    }
  }
`;
