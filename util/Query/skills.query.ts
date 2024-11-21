import { gql, TypedDocumentNode } from "@apollo/client";

export const SkillsPagination: TypedDocumentNode = gql`
  query SkillsPagination($input: PaginationInput!, $search: String) {
    skillsPagination(input: $input, search: $search) {
      item {
        skills
        skillsID
        createdAt
      }
      hasPrevPage
      hasNextPage
      currentPage
      totalItems
      totalPages
    }
  }
`;

export const GetSkillByProfileID: TypedDocumentNode = gql`
  query GetSkillByProfileID($profileId: ID!) {
    getSkillByProfileID(profileID: $profileId) {
      skillsID
      skills
    }
  }
`;
