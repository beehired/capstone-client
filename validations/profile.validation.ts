import * as Yup from "yup";

export const UserProfileValidation = Yup.object().shape({
  firstname: Yup.string().trim().required("Firstname is required").max(50),
  lastname: Yup.string().trim().required("Lastname is required").max(50),
  birthday: Yup.string().trim().required("Birthday is required"),
  phone: Yup.string()
    .trim()
    .required("Phone is required")
    .matches(
      /^[0-9]{10,11}$/,
      "Phone number must be 10 or 11 digits long and contain only numbers"
    ),
});
