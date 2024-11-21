import { gql, TypedDocumentNode } from "@apollo/client";

export const GetMyPortfolioByProfileId: TypedDocumentNode = gql`
  query GetPortfolioByProfileID($profileId: ID!) {
    getPortfolioByProfileID(profileID: $profileId) {
      portfolioID
      title
      description
      companyName
      startYear
      startMonth
      endMonth
      endYear
      createdAt
      location
      employmentType
      location
      locationType
      skills {
        skillsID
        skills
      }
    }
  }
`;

export const GetMyPortfolioById: TypedDocumentNode = gql`
  query GetPortfolioById($portfolioId: ID!) {
    getPortfolioById(portfolioID: $portfolioId) {
      portfolioID
      title
      description
      companyName
      startYear
      startMonth
      endMonth
      endYear
      createdAt
      location
      employmentType
      location
      locationType
      skills {
        skillsID
        skills
      }
    }
  }
`;
