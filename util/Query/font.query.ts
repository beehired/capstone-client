import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllFontFamily: TypedDocumentNode = gql`
  query GetAllFonts($pagination: PaginationInput!, $search: String) {
    getAllFonts(pagination: $pagination, search: $search) {
      item {
        fontID
        image
        font
        createdAt
        updatedAt
      }
      totalItems
      totalPages
      currentPage
      hasNextPage
      hasPrevPage
    }
  }
`;
