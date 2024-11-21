import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateMyPortfolio: TypedDocumentNode = gql`
  mutation CreatePortfolio(
    $profileId: ID!
    $input: PortfolioInput!
    $skills: [String]
  ) {
    createPortfolio(profileID: $profileId, input: $input, skills: $skills) {
      ... on ErrorObject {
        code
        message
      }
      ... on portfolio {
        portfolioID
      }
    }
  }
`;

export const UpdateMyPorfolio: TypedDocumentNode = gql`
  mutation UpdatePortfolio(
    $portfolioId: ID!
    $input: PortfolioInput!
    $skills: [String]!
  ) {
    updatePortfolio(portfolioID: $portfolioId, input: $input, skills: $skills) {
      portfolioID
    }
  }
`;

export const DeleteMyPortfolio: TypedDocumentNode = gql`
  mutation DeletePortfolio($portfolioId: ID!) {
    deletePortfolio(portfolioID: $portfolioId) {
      portfolioID
    }
  }
`;
