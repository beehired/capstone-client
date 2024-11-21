import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllCompanieReview: TypedDocumentNode = gql`
  query GetAllCompanyReview($input: PaginationInput!, $companyId: ID!) {
    getAllCompanyReview(input: $input, companyID: $companyId) {
      item {
        review
        rating
        reviewID
        User {
          myProfile {
            firstname
            lastname
          }
        }
      }
      currentPage
      hasNextPage
      hasPrevPage
      totalItems
      totalPages
    }
  }
`;
