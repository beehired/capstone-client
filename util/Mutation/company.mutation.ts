import { TypedDocumentNode, gql } from "@apollo/client";

export const UpdateCompanyStatus: TypedDocumentNode = gql`
  mutation UpdateCompany($companyId: ID!) {
    updateCompany(companyID: $companyId) {
      companyName
    }
  }
`;

export const CompanyDocumentRequirement: TypedDocumentNode = gql`
  mutation CompanyUploadDocuments($companyId: ID!, $file: Upload!) {
    companyUploadDocuments(companyID: $companyId, file: $file) {
      type
      requirementsID
      requirement
      createdAt
    }
  }
`;

export const UpdateCompanyLogo: TypedDocumentNode = gql`
  mutation UpdateCompanyLogo($companyId: ID!, $file: Upload!) {
    updateCompanyLogo(companyID: $companyId, file: $file) {
      companyID
    }
  }
`;
