import { TypedDocumentNode, gql } from "@apollo/client";

export const UpdateNotification: TypedDocumentNode = gql`
  mutation UpdateNotification($notificationId: ID!) {
    updateNotification(notificationID: $notificationId) {
      notificationID
    }
  }
`;

export const MarkAllAsRead: TypedDocumentNode = gql`
  mutation MarkallNotificationAsRead($userId: ID!) {
    markallNotificationAsRead(userID: $userId) {
      notificationID
    }
  }
`;


export const ArchiveNotification: TypedDocumentNode = gql`
  mutation ArchiveNotification($notificationId: ID!) {
    archiveNotification(notificationID: $notificationId) {
      notificationID
    }
  }
`;