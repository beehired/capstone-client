import * as Yup from "yup";

export const ClientRegister = Yup.object().shape({
  firstname: Yup.string().min(2).required("Firstname is required").trim(),
  lastname: Yup.string().min(2).required("Lastname is required").trim(),
  plan: Yup.string().required("Subscriptions Plan is required"),
  email: Yup.string().email().required("Email Address is Required").trim(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPass: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password is not match"),
  companyName: Yup.string().required("The Company Name is required"),
  description: Yup.string()
    .max(1000, "The max length is only 1000 characters")
    .required("Company Description is required"),
  country: Yup.string().required("Country is required"),
  companySize: Yup.string().required("The Company Size is required"),
  location: Yup.string().required("The Company location is required"),
  upload: Yup.mixed().required("Company Logo is Required"),
  tnc: Yup.boolean()
    .default(false)
    .oneOf([true], "You must accept the Terms and Agreement and Data Policy"),
});

export const FreelancerRegister = Yup.object().shape({
  firstname: Yup.string().min(2).required("Firstname is required").trim(),
  lastname: Yup.string().min(2).required("Lastname is required").trim(),
  email: Yup.string().email().required("Email Address is Required").trim(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPass: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password is not match"),
  TypeID: Yup.string().trim().required("You need to select a Valid ID"),
  upload: Yup.mixed().required("You required to upload a document"),
  skills: Yup.array(Yup.string())
    .min(3, "At least three (3) skill")
    .required("Add skills at least three"),
  tnc: Yup.boolean()
    .default(false)
    .oneOf([true], "You must accept the Terms and Agreement and Data Policy"),
});

export const AdminRegister = Yup.object().shape({
  firstname: Yup.string().min(2).required("Firstname is required").trim(),
  lastname: Yup.string().min(2).required("Lastname is required").trim(),
  email: Yup.string().email().required("Email Address is Required").trim(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});
