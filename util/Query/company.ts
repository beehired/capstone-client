import { gql, TypedDocumentNode } from "@apollo/client";

export const GetCompany: TypedDocumentNode = gql`
  query GetMyCompanyByUserID($userId: ID!) {
    getMyCompanyByUserID(userID: $userId) {
      logo {
        mediaID
        media
      }
      companyID
      companyName
      slug
      verified
      user {
        plan
      }
      requirements {
        requirementsID
        type
        requirement
        createdAt
      }
    }
  }
`;

export const GetAllCompanies: TypedDocumentNode = gql`
  query GetAllCompanies(
    $input: PaginationInput!
    $search: String
    $verified: Boolean
  ) {
    getAllCompanies(input: $input, search: $search, verified: $verified) {
      currentPage
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
      item {
        companyID
        companyName
        description
        companySize
        getJobPostCount
        slug
        logo {
          media
        }
        verified
        user {
          plan
          email
          myProfile {
            firstname
            lastname
          }
        }
      }
    }
  }
`;

export const CompanySlug: TypedDocumentNode = gql`
  query GetCompanySlug($slug: String!) {
    getCompanySlug(slug: $slug) {
      companyID
      companyName
      companySize
      description
      getJobPostCount
      location
      verified
      requirements {
        requirementsID
        type
        requirement
        createdAt
      }
      jobPost {
        jobPostID
        title
        description
        duration
        endDate
        status
        experience
        salary {
          min
          max
          fixed
          currency
        }
        location
        isArchive
        isOpen
        createdAt
      }
      logo {
        media
      }
    }
  }
`;
