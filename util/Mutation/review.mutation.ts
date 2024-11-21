import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateUserReview: TypedDocumentNode = gql`
  mutation CreateUserReview(
    $rating: Float!
    $review: String!
    $userId: ID!
    $companyId: ID!
  ) {
    createUserReview(
      rating: $rating
      review: $review
      userID: $userId
      companyID: $companyId
    ) {
      reviewID
      review
    }
  }
`;

export const CreateCompanyReview: TypedDocumentNode = gql`
  mutation CreateCompanyReview(
    $rating: Float!
    $companyId: ID!
    $review: String!
  ) {
    createCompanyReview(
      rating: $rating
      companyID: $companyId
      review: $review
    ) {
      reviewID
    }
  }
`;
