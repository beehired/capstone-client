import { gql, TypedDocumentNode } from "@apollo/client";

export const GetMyUserProfile: TypedDocumentNode = gql`
  query GetProfileByUser($userId: ID!) {
    getProfileByUser(userID: $userId) {
      profileID
      firstname
      lastname
      birthday
      phone
      avatar {
        mediaID
        media
      }
      user {
        getMyCompany {
          companyName
          logo {
            media
          }
        }
      }
    }
  }
`;

export const GetAllUsersByRole: TypedDocumentNode = gql`
  query GetAllUserAccountByRole(
    $input: PaginationInput
    $role: String
    $search: String
    $verified: Boolean
  ) {
    getAllUserAccountByRole(
      input: $input
      role: $role
      search: $search
      verified: $verified
    ) {
      item {
        userID
        email
        verified
        createdAt
        myProfile {
          firstname
          lastname
          birthday
          phone
          avatar {
            mediaID
            media
          }
        }
      }
      totalItems
      totalPages
      currentPage
      hasNextPage
      hasPrevPage
    }
  }
`;

export const GetUserByUserId: TypedDocumentNode = gql`
  query GetUserAccountById($userId: ID!) {
    getUserAccountById(userID: $userId) {
      userID
      email
      verified
      myProfile {
        firstname
        lastname
        avatar {
          media
        }
      }
      requirement {
        requirementsID
        requirement
        type
        createdAt
      }
    }
  }
`;
