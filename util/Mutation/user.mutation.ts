import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateFreelancerAcc: TypedDocumentNode = gql`
  mutation CreateUserFreelancers(
    $input: UserFreelanceInput!
    $skills: [String]!
    $fileUpload: Upload!
    $requirement: RequirementInput
  ) {
    createUserFreelancers(
      input: $input
      skills: $skills
      fileUpload: $fileUpload
      requirement: $requirement
    ) {
      ... on user {
        userID
        email
        createdAt
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const CreateUserRecruiter: TypedDocumentNode = gql`
  mutation CreateUserRecruiter(
    $input: UserRecruiterInput!
    $file: Upload!
    $subscriptionId: String
  ) {
    createUserRecruiter(
      input: $input
      file: $file
      subscriptionId: $subscriptionId
    ) {
      ... on user {
        userID
        email
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const VerifyUserAccount: TypedDocumentNode = gql`
  mutation VerifyMyAccount($userId: ID!) {
    verifyMyAccount(userID: $userId) {
      userID
    }
  }
`;

export const CraeteUserAdmin: TypedDocumentNode = gql`
  mutation CreateUserAdminAccount($input: UserInput!) {
    createUserAdminAccount(input: $input) {
      ... on user {
        userID
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const ChangeEmailAddresses: TypedDocumentNode = gql`
  mutation ChangeEmailAddress($userId: ID!, $email: String!) {
    ChangeEmailAddress(userID: $userId, email: $email) {
      ... on ErrorObject {
        code
        message
      }
      ... on user {
        userID
      }
    }
  }
`;

export const DeacMyAcc: TypedDocumentNode = gql`
  mutation DeactivateMyAccount($userId: ID!) {
    deactivateMyAccount(userID: $userId) {
      userID
    }
  }
`;

export const DeleteMyAdminAcc: TypedDocumentNode = gql`
  mutation DeleteUserAccount($userId: ID!) {
    deleteUserAccount(userID: $userId) {
      userID
    }
  }
`;


export const UpdateUserProfile: TypedDocumentNode = gql`
  mutation UpdateUserProfile($userId: ID!, $input: ProfileInput) {
    updateUserProfile(userID: $userId, input: $input) {
      userID
    }
  }
`;