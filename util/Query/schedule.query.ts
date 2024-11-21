import { gql, TypedDocumentNode } from "@apollo/client";

export const GetScheduleByDate: TypedDocumentNode = gql`
  query GetScheduleByDate($date: String!, $userId: ID!) {
    getScheduleByDate(date: $date, userID: $userId) {
      scheduleID
      title
      startDate
      endDate
      description
      link
    }
  }
`;

export const GetScheduleById: TypedDocumentNode = gql`
  query GetScheduleById($scheduleId: ID!) {
    getScheduleById(scheduleID: $scheduleId) {
      scheduleID
      title
      link
      startDate
      startTime
      endTime
      endDate
      description
      applicant {
        myProfile {
          firstname
          lastname
        }
      }
    }
  }
`;


export const GetScheduleByReceiverId: TypedDocumentNode = gql`
  query GetReceiverByDate($date: String!, $userId: ID!) {
    getReceiverByDate(date: $date, userID: $userId) {
      scheduleID
      title
      link
      startDate
      startTime
      endTime
      endDate
      description
      applicant {
        myProfile {
          firstname
          lastname
        }
      }
    }
  }
`;
