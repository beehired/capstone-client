import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateMessage: TypedDocumentNode = gql`
  mutation CreateMessage(
    $senderId: String!
    $receiverId: String!
    $file: [Upload]
    $message: String
  ) {
    createMessage(
      senderID: $senderId
      receiverID: $receiverId
      file: $file
      message: $message
    ) {
      messageID
    }
  }
`;

export const DeleteMessage: TypedDocumentNode = gql`
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageID: $messageId) {
      messageID
    }
  }
`;

export const UpdateMessageStatus: TypedDocumentNode = gql`
  mutation UpdateMessageStatus($receiverId: ID!) {
    updateMessageStatus(receiverID: $receiverId) {
      messageStatus {
        messageStatusID
      }
    }
  }
`;
