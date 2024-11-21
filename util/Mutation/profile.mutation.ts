import { gql, TypedDocumentNode } from "@apollo/client";

export const AddProfileHeader: TypedDocumentNode = gql`
  mutation AddProfileHeader($profileId: ID!, $file: Upload!) {
    addProfileHeader(profileID: $profileId, file: $file) {
      profileID
    }
  }
`;

export const DeleteProfileHeader: TypedDocumentNode = gql`
  mutation DeleteProfileHeader($mediaId: ID!, $profileId: ID!) {
    deleteProfileHeader(mediaID: $mediaId, profileID: $profileId) {
      profileID
    }
  }
`;

export const AddProfileAvatar: TypedDocumentNode = gql`
  mutation AddProfileAvatar($profileId: ID!, $file: Upload!) {
    addProfileAvatar(profileID: $profileId, file: $file) {
      profileID
    }
  }
`;

export const DeleteProfileAvatar: TypedDocumentNode = gql`
  mutation DeleteProfileAvatar($profileId: ID!, $mediaId: ID!) {
    deleteProfileAvatar(profileID: $profileId, mediaID: $mediaId) {
      profileID
    }
  }
`;

export const AddThemeFonts: TypedDocumentNode = gql`
  mutation AddProfileThemnFonts($profileId: ID!, $fontId: ID!, $themeId: ID!) {
    addProfileThemnFonts(
      profileID: $profileId
      fontID: $fontId
      themeID: $themeId
    ) {
      profileID
    }
  }
`;
