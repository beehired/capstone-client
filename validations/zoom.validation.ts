import * as Yup from "yup";

export const ZoomIntegrationSchema = Yup.object().shape({
  accountID: Yup.string().trim().required("Account ID is Required"),
  clientID: Yup.string().trim().required("Client ID is required"),
  secretID: Yup.string().trim().required("Secret ID is required"),
});

export const ZoomUpdadteIntegrationSchema = Yup.object().shape({
  integrationId: Yup.string().trim().required("Integration ID is required"),
  accountID: Yup.string().trim().required("Account ID is Required"),
  clientID: Yup.string().trim().required("Client ID is required"),
  secretID: Yup.string().trim().required("Secret ID is required"),
});
