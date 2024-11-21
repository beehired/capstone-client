import { TypedDocumentNode, gql } from "@apollo/client";

export const PaypalCancelSubscription = gql`
  mutation CancelSubscription($userId: ID!) {
    cancelSubscription(userID: $userId) {
      reason
    }
  }
`;

export const UpgradePaypalSubscription = gql`
  mutation UpgradeSubscription($userId: ID!, $subscriptionId: String!) {
    upgradeSubscription(userID: $userId, subscriptionId: $subscriptionId) {
      userID
    }
  }
`;
