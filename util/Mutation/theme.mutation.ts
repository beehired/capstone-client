import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateProfileTheme: TypedDocumentNode = gql`
  mutation CreateTheme($userId: ID!, $theme: String!, $file: Upload!) {
    createTheme(userID: $userId, theme: $theme, file: $file) {
      themeID
    }
  }
`;

export const DeleteProfileTheme: TypedDocumentNode = gql`
  mutation DeleteTheme($themeId: ID!) {
    deleteTheme(themeID: $themeId) {
      themeID
    }
  }
`;

export const UpdateProfileTheme: TypedDocumentNode = gql`
  mutation UpdateTheme($themeId: ID!, $theme: String!, $file: Upload) {
    updateTheme(themeID: $themeId, theme: $theme, file: $file) {
      themeID
    }
  }
`;
