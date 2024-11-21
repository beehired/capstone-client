import { gql, TypedDocumentNode } from "@apollo/client";

export const AdminDashboard: TypedDocumentNode = gql`
  query GetDashboardQuery($filter: String) {
    getDashboardQuery {
      jobpost
      applicants
      users
      report
      company
      schedule
      jobpostList(filter: $filter) {
        jobPostID
        applicants
        jobTitle {
          title
        }
      }
    }
  }
`;

export const GetEmployerDashboard: TypedDocumentNode = gql`
  query GetEmployerDashboardQuery($companyId: ID) {
    getEmployerDashboardQuery(companyID: $companyId) {
      JobPost
      schedule
      projects
      getScheduleList {
        scheduleID
        title
        startTime
        startDate
        link
      }
      applicants
      getMyJobPost {
        applicants
        jobPostID
        jobTitle {
          title
        }
      }
    }
  }
`;
