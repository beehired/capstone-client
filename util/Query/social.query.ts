import { gql, TypedDocumentNode } from "@apollo/client";

export const SocialLinkQuery: TypedDocumentNode = gql`
  query GetAllMySocialLink($profileId: ID!) {
    getAllMySocialLink(profileID: $profileId) {
      socialID
      instagram
      facebook
      X
      Web
      Github
    }
  }
`;
