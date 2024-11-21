import { gql, TypedDocumentNode } from "@apollo/client";

export const GetAllReport: TypedDocumentNode = gql`
  query Item($input: PaginationInput!) {
    getAllJobPostReport(input: $input) {
      item {
        reportID
        message
        jobPost {
          jobPostID
          title
          description
          createdAt
          duration
          experience
          endDate
          location
          status
        }
        user {
          myProfile {
            firstname
            lastname
          }
        }
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

export const GetReportById: TypedDocumentNode = gql`
  query GetReportById($reportId: ID!) {
    getReportById(reportID: $reportId) {
      reportID
      message
      jobPost {
        jobPostID
        title
        description
        createdAt
        duration
        experience
        endDate
        location
        status
      }
      user {
        myProfile {
          firstname
          lastname
        }
      }
      createdAt
    }
  }
`;
