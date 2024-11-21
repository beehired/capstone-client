import { gql, TypedDocumentNode } from "@apollo/client";

export const ActivityLogs: TypedDocumentNode = gql`
  mutation Logout($userId: ID!) {
    Logout(userID: $userId) {
      logsID
    }
  }
`;
