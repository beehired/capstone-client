import { gql, TypedDocumentNode } from "@apollo/client";

export const GetMyZoomIntegration: TypedDocumentNode = gql`
  query GetMyZoomIntegration($userId: ID!) {
    getMyZoomIntegration(userID: $userId) {
      accountID
      clientID
      integrationID
      secretID
    }
  }
`;
