import { TypedDocumentNode, gql } from "@apollo/client";

export const GetApplicantByJobPostId: TypedDocumentNode = gql`
  query GetApplicantJobPostByIdPagination(
    $input: PaginationInput!
    $jobPostId: ID!
    $search: String
  ) {
    getApplicantJobPostByIdPagination(
      input: $input
      jobPostID: $jobPostId
      search: $search
    ) {
      item {
        applicationID
        id
        status
        createdAt
        score {
          score
        }
        resume {
          resume
        }
        user {
          userID
          email
          myProfile {
            firstname
            lastname
            avatar {
              media
            }
            about {
              aboutID
              bio
            }
            portfolio {
              portfolioID
              title
              description
              companyName
              employmentType
              location
              locationType
              startYear
              startMonth
              endYear
              endMonth
              skills {
                skillsID
                skills
              }
            }
            education {
              educationID
              school
              degree
              study
              startYear
              startMonth
              endYear
              endMonth
            }
            skills {
              skillsID
              skills
            }
          }
        }
      }
      currentPage
      totalItems
      totalPages
      hasNextPage
      hasPrevPage
    }
  }
`;

export const GetApplicantById: TypedDocumentNode = gql`
  query GetApplicationByID($applicationId: ID!) {
    getApplicationByID(applicationID: $applicationId) {
      applicationID
      id
      status
      score {
        score
      }
      resume {
        resume
      }
      user {
        myProfile {
          profileID
          firstname
          lastname
          avatar {
            media
          }
          about {
            aboutID
            bio
          }
          portfolio {
            portfolioID
            title
            description
            companyName
            employmentType
            location
            locationType
            startYear
            startMonth
            endYear
            endMonth
            skills {
              skillsID
              skills
            }
          }
          education {
            educationID
            school
            degree
            study
            startYear
            startMonth
            endYear
            endMonth
          }
          skills {
            skillsID
            skills
          }
        }
      }
    }
  }
`;

export const GetMyApplication: TypedDocumentNode = gql`
  query Query($userId: ID!, $input: PaginationInput!, $status: String!) {
    getMyApplication(userID: $userId, input: $input, status: $status) {
      item {
        id
        jobPost {
          title
          description
          JobType
          isOpen
          duration
          location
          experience
          getCompany {
            companyName
            logo {
              media
            }
          }
        }
      }
      currentPage
      totalItems
      totalPages
      hasPrevPage
      hasNextPage
    }
  }
`;
