import { gql, TypedDocumentNode } from "@apollo/client";

export const GetPersonalMessage: TypedDocumentNode = gql`
  query GetPersonalMessage($senderId: ID!, $receiverId: ID!) {
    getPersonalMessage(senderID: $senderId, receiverID: $receiverId) {
      messageID
      message
      createdAt
      media {
        media
      }
      messageStatus {
        isRead
        createdAt
      }
      receivedUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
      sendUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
    }
  }
`;

export const GetFreelancerMessageMe: TypedDocumentNode = gql`
  query GetListofMessage($userId: ID!, $search: String) {
    getListofMessage(userID: $userId, search: $search) {
      messageID
      message
      createdAt
      media {
        media
      }
      messageStatus {
        isRead
        createAt
      }
      receivedUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
      sendUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
    }
  }
`;

export const GetWhoMessageMe: TypedDocumentNode = gql`
  query GetAllMyMessage($userId: ID!, $search: String) {
    getAllMyMessage(userID: $userId, search: $search) {
      messageID
      message
      createdAt
      media {
        media
      }
      messageStatus {
        isRead
        createdAt
      }
      receivedUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
      sendUser {
        userID
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
    }
  }
`;

export const GetMessageList: TypedDocumentNode = gql`
  query GetMessages($userId: ID!, $search: String) {
    getMessages(userID: $userId, search: $search) {
      userID
      user {
        myProfile {
          firstname
          lastname
          avatar {
            media
          }
        }
      }
      message {
        messageID
        message
        createdAt
        media {
          media
        }
        messageStatus {
          messageStatusID
          isRead
          createdAt
        }

        sendUser {
          userID
          myProfile {
            firstname
            lastname
          }
        }
      }
    }
  }
`;

export const GetUnreadChat: TypedDocumentNode = gql`
  query Query($userId: ID!) {
    getUnreadCountMessage(userID: $userId)
  }
`;
