import { TypedDocumentNode, gql } from "@apollo/client";

export const LOGIN: TypedDocumentNode = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on token {
        userID
        role
        token
        user {
          email
          verified
          myProfile {
            profileID
            firstname
            lastname
          }
          getMyCompany {
            companyID
            companyName
          }
        }
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const FINDEmailAddress: TypedDocumentNode = gql`
  mutation FindMyEmailAddress($email: String!) {
    findMyEmailAddress(email: $email) {
      ... on ErrorObject {
        code
        message
      }
      ... on user {
        userID
        verified
      }
    }
  }
`;

export const ResetPasswordLink: TypedDocumentNode = gql`
  mutation Mutation($reset: String!) {
    getMyResetPasswordLink(reset: $reset) {
      ... on resetPassword {
        resetPassID
        reset
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const UpdateUserAccountPassword: TypedDocumentNode = gql`
  mutation UpdateUserPasswordAccount($userId: ID!, $password: String!) {
    updateUserPasswordAccount(userID: $userId, password: $password) {
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

export const VerifyMyAccount: TypedDocumentNode = gql`
  mutation Mutation($userId: ID!) {
    verifyMyAccount(userID: $userId) {
      userID
      email
    }
  }
`;

export const CheckEmailAddress: TypedDocumentNode = gql`
  mutation CheckMyEmailAddress($email: String!) {
    checkMyEmailAddress(email: $email) {
      ... on user {
        email
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;
