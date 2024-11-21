import * as Yup from "yup";

export const ChangeEmaillAddressSchema = Yup.object().shape({
  email: Yup.string().email().trim().required("Email Address is required"),
  userId: Yup.string().trim().required("User ID is required"),
});
