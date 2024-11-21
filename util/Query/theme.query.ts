import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllProfileTheme: TypedDocumentNode = gql`
  query GetThemes($pagination: PaginationInput!, $search: String) {
    getThemes(pagination: $pagination, search: $search) {
      totalItems
      totalPages
      item {
        themeID
        theme
        image
        createdAt
      }
      hasPrevPage
      hasNextPage
      currentPage
    }
  }
`;
