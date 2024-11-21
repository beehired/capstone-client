import { gql, TypedDocumentNode } from "@apollo/client";

export const GetProfileHeaderByUser: TypedDocumentNode = gql`
  query GetProfileByUser($userId: ID!) {
    getProfileByUser(userID: $userId) {
      header {
        mediaID
        media
      }
    }
  }
`;

export const GetUserByProfileId: TypedDocumentNode = gql`
  query GetUserProfileById($profileId: ID!) {
    getUserProfileById(profileID: $profileId) {
      user {
        email
      }
      review {
        review
        company {
          companyID
          companyName
          user {
            myProfile {
              firstname
              lastname
            }
          }
        }
      }
      header {
        media
      }
      avatar {
        media
      }
      firstname
      lastname
      education {
        educationID
        degree
        endMonth
        endYear
        school
        startMonth
        startYear
        study
      }
      portfolio {
        portfolioID
        title
        startYear
        startMonth
        skills {
          skills
        }
        location
        endYear
        endMonth
        employmentType
        description
        companyName
        locationType
      }
      skills {
        skills
      }
      about {
        bio
      }
      getMyResume {
        resume
      }
      social {
        facebook
        instagram
        Github
        Web
        X
      }
      getMyTheme {
        theme
      }
      getMyFont {
        font
      }
    }
  }
`;
