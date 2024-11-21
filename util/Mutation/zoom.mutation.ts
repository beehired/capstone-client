import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateZoomIntegration: TypedDocumentNode = gql`
  mutation CreateZoomIntegration(
    $userId: ID!
    $accountId: String!
    $clientId: String!
    $secretId: String!
  ) {
    createZoomIntegration(
      userID: $userId
      accountID: $accountId
      clientID: $clientId
      secretID: $secretId
    ) {
      accountID
      clientID
      integrationID
      secretID
    }
  }
`;

export const UpdateZoomIntegration: TypedDocumentNode = gql`
  mutation UpdateZoomIntegration(
    $integrationId: ID!
    $accountId: String!
    $clientId: String!
    $secretId: String!
  ) {
    updateZoomIntegration(
      integrationID: $integrationId
      accountID: $accountId
      clientID: $clientId
      secretID: $secretId
    ) {
      integrationID
    }
  }
`;
