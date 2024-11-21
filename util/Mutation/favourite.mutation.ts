import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateFavourite: TypedDocumentNode = gql`
  mutation CreateFavourite($userId: ID!, $jobPostId: ID!) {
    createFavourite(userID: $userId, jobPostID: $jobPostId) {
      ... on favourite {
        favouriteID
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const DeleteFavourite: TypedDocumentNode = gql`
  mutation DeleteFavourite($favouriteId: ID!) {
    deleteFavourite(favouriteID: $favouriteId) {
      favouriteID
    }
  }
`;
