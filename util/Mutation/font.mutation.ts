import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateFontFamily: TypedDocumentNode = gql`
  mutation CreateFontFamily($userId: ID!, $font: String!, $file: Upload!) {
    createFontFamily(userID: $userId, font: $font, file: $file) {
      fontID
      image
      font
      createdAt
    }
  }
`;

export const UpdateFontFamily: TypedDocumentNode = gql`
  mutation UpdateFontFamily($fontId: String!, $font: String!, $file: Upload) {
    updateFontFamily(fontID: $fontId, font: $font, file: $file) {
      fontID
    }
  }
`;

export const DeleteFontFamily: TypedDocumentNode = gql`
  mutation DeleteFontFamily($fontId: ID!, $userId: ID!) {
    deleteFontFamily(fontID: $fontId, userID: $userId) {
      fontID
    }
  }
`;
