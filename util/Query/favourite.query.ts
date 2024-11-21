import { gql, TypedDocumentNode } from "@apollo/client";

export const FavouriteQuery: TypedDocumentNode = gql`
  query GetMyFavouriteJobPost($userId: ID!, $jobPostId: ID!) {
    getMyFavouriteJobPost(userID: $userId, jobPostID: $jobPostId) {
      favouriteID
      createdAt
      jobPost {
        jobPostID
      }
    }
  }
`;

export const GetMyFavouriteSaveJobs: TypedDocumentNode = gql`
  query GetAllMySaveJobs($userId: ID!) {
    getAllMySaveJobs(userID: $userId) {
      favouriteID
      jobPost {
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
