import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid Email ")
    .trim()
    .required("Email Address is required"),
  password: Yup.string().trim().required("Password is required"),
});
