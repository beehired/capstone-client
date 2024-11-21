import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateReportJobPost: TypedDocumentNode = gql`
  mutation CreateReportJobPost(
    $jobPostId: ID!
    $message: String!
    $userId: ID!
  ) {
    createReportJobPost(
      jobPostID: $jobPostId
      message: $message
      userID: $userId
    ) {
      reportID
      message
    }
  }
`;
