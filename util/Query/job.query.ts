import { TypedDocumentNode, gql } from "@apollo/client";

export const GetAllJobPost: TypedDocumentNode = gql`
  query GetAllJobPost($input: PaginationInput!) {
    getAllJobPost(input: $input) {
      jobPostID
      title
      description
      JobType
      location
      salary {
        max
        min
        currency
      }
      getCompany {
        logo {
          media
        }
        companyName
      }
      skills {
        skillsID
        skills
      }
      createdAt
      updatedAt
    }
  }
`;

export const GetJobPostID: TypedDocumentNode = gql`
  query GetJobPostById($jobPostId: ID!) {
    getJobPostById(jobPostID: $jobPostId) {
      jobPostID
      title
      description
      location
      slug
      experience
      endDate
      duration
      JobType
      isArchive
      status
      isOpen
      createdAt
      salary {
        salaryID
        fixed
        min
        max
        currency
      }
      totalApplicant
      createdAt
      updatedAt
      skills {
        skillsID
        skills
      }
      applicants {
        applicationID
        createdAt
        id
        status
        user {
          myProfile {
            firstname
            lastname
          }
        }
        score {
          score
        }
      }
    }
  }
`

export const GetMyJobPostPagination: TypedDocumentNode = gql`
  query JobPagination(
    $userId: ID!
    $search: String
    $pagination: PaginationInput
    $archive: Boolean
  ) {
    jobPagination(
      userID: $userId
      search: $search
      pagination: $pagination
      archive: $archive
    ) {
      item {
        jobPostID
        title
        description
        slug

        isArchive
        endDate
        experience
        totalApplicant
        createdAt
      }
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
      currentPage
    }
  }
`;

export const JobBoard: TypedDocumentNode = gql`
  query GetJobBoard(
    $input: PaginationInput!
    $skills: [String]
    $search: String
    $orderBy: String
    $duration: [String]
    $experience: [String]
    $jobType: [String]
    $filter: String!
  ) {
    getJobBoard(
      input: $input
      search: $search
      skills: $skills
      jobType: $jobType
      experience: $experience
      duration: $duration
      orderBy: $orderBy
      filter: $filter
    ) {
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
      currentPage
      item {
        jobPostID
        title
        slug
        description
        location
        duration
        totalApplicant
        experience
        endDate
        createdAt
        JobType
        salary {
          max
          min
          fixed
          currency
        }
        skills {
          skillsID
          skills
        }
        getCompany {
          companyName
          logo {
            mediaID
            media
          }
        }
      }
    }
  }
`;

export const JobPostSimilar: TypedDocumentNode = gql`
  query GetSimilarJobPost(
    $skills: [String]!
    $input: PaginationInput!
    $jobPostId: ID!
  ) {
    getSimilarJobPost(skills: $skills, input: $input, jobPostID: $jobPostId) {
      jobPostID
      title
      JobType
      createdAt
      updatedAt
      totalApplicant
      getCompany {
        companyName
        logo {
          mediaID
          media
        }
      }
    }
  }
`;
