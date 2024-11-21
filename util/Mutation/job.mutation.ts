import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateJobPost: TypedDocumentNode = gql`
  mutation CreateJobPost(
    $companyId: ID!
    $input: jobPostInput!
    $salary: salaryInput!
    $skills: [String]!
    $file: Upload
  ) {
    createJobPost(
      companyID: $companyId
      input: $input
      salary: $salary
      skills: $skills
      file: $file
    ) {
      ... on jobpost {
        jobPostID
      }
      ... on ErrorObject {
        code
        message
      }
    }
  }
`;

export const UpdateJobPost: TypedDocumentNode = gql`
  mutation UpdateJobPost(
    $jobPostId: ID!
    $skills: [String]!
    $input: jobPostInput
    $salary: salaryInput
  ) {
    updateJobPost(
      jobPostID: $jobPostId
      skills: $skills
      input: $input
      salary: $salary
    ) {
      jobPostID
      title
    }
  }
`;

export const DeleteJobPost: TypedDocumentNode = gql`
  mutation DeleteJobPost($jobPostId: ID!) {
    deleteJobPost(jobPostID: $jobPostId) {
      jobPostID
      title
    }
  }
`;

export const ArchiveJobPost: TypedDocumentNode = gql`
  mutation ArchiveJobPost($jobPostId: ID!, $boolean: Boolean) {
    archiveJobPost(jobPostID: $jobPostId, boolean: $boolean) {
      jobPostID
      title
    }
  }
`;

export const JobSettingsMutation: TypedDocumentNode = gql`
  mutation UpdateJobSettings(
    $jobPostId: ID!
    $applicationStatus: String
    $status: String
  ) {
    updateJobSettings(
      jobPostID: $jobPostId
      applicationStatus: $applicationStatus
      status: $status
    ) {
      jobPostID
    }
  }
`;
