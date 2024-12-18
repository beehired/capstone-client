import * as Yup from "yup";

export const ZoomIntegrationSchema = Yup.object().shape({
  accountID: Yup.string().trim().required("Account ID is Required").max(100),
  clientID: Yup.string().trim().required("Client ID is required").max(100),
  secretID: Yup.string().trim().required("Secret ID is required").max(100),
});

export const ZoomUpdadteIntegrationSchema = Yup.object().shape({
  integrationId: Yup.string().trim().required("Integration ID is required"),
  accountID: Yup.string().trim().required("Account ID is Required").max(100),
  clientID: Yup.string().trim().required("Client ID is required").max(100),
  secretID: Yup.string().trim().required("Secret ID is required").max(100),
});
