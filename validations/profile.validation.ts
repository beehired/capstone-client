import * as Yup from "yup";

export const UserProfileValidation = Yup.object().shape({
  firstname: Yup.string().trim().required("Firstname is required"),
  lastname: Yup.string().trim().required("Lastname is required"),
  birthday: Yup.string().trim().required("Birthday is required"),
  phone: Yup.string().trim().required("Phone is required"),
});
