import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateScheduleMeeting: TypedDocumentNode = gql`
  mutation CreateSchedule(
    $input: ScheduleInput!
    $senderId: String!
    $receiverId: String!
    $actkn: String!
    $applicantId: ID!
  ) {
    createSchedule(
      input: $input
      senderID: $senderId
      receiverID: $receiverId
      actkn: $actkn
      applicantID: $applicantId
    ) {
      ... on ErrorObject {
        code
        message
      }
      ... on schedule {
        scheduleID
        title
      }
    }
  }
`;

export const UpdateScheduleMeeting: TypedDocumentNode = gql`
  mutation UpdateSchedule($scheduleId: ID!, $input: ScheduleInput!) {
    updateSchedule(scheduleID: $scheduleId, input: $input) {
      scheduleID
    }
  }
`;

export const DeleteScheduleMeeting: TypedDocumentNode = gql`
  mutation DeleteSchedule($scheduleId: ID!) {
    deleteSchedule(scheduleID: $scheduleId) {
      scheduleID
    }
  }
`;
