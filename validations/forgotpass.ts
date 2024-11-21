import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Address must be valid Email ")
    .trim()
    .required("Email address is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  newpass: Yup.string()
    .trim()
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  retypepass: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newpass")], "Password does not match"),
});
