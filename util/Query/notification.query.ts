import { TypedDocumentNode, gql } from "@apollo/client";

export const GetAllNotificationByUserID = gql`
  query GetNotificationByUserID($userId: ID!, $cursor: String, $limit: Int) {
    getNotificationByUserID(userID: $userId, cursor: $cursor, limit: $limit) {
      cursor
      notification {
        notificationID
        title
        read
        createdAt
        schedule {
          startDate
          startTime
          endTime
          endDate
          link
          description
          title
        }
        company {
          companyName
          logo {
            media
          }
        }
        application {
          id
          score {
            score
          }
          user {
            myProfile {
              avatar {
                media
              }
            }
          }
          resume {
            resume
          }
          jobPost {
            title
            description
            duration
            experience
            location
          }
          company {
            companyName
            logo {
              media
            }
          }
        }
      }
    }
  }
`;

export const GetUnreadNotification: TypedDocumentNode = gql`
  query Query($userId: ID!) {
    unreadNotification(userID: $userId)
  }
`;
