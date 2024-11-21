import * as Yup from "yup";

export const CreateValidationEducationBackground = Yup.object().shape({
  school: Yup.string().trim().required("School Name is required"),
  degree: Yup.string().trim().required("Degree is required"),
  study: Yup.string().trim().required("Study is required"),
  startMonth: Yup.string().trim().required("Start Month is required"),
  startYear: Yup.string().trim().required("Start year is required"),
  endMonth: Yup.string().trim().required("End Month is required"),
  endYear: Yup.number().min(
    Yup.ref("startYear"),
    "End Year Can't be earlier than start date"
  ),
});

export const UpdateValidationEducationBackground = Yup.object().shape({
  educationId: Yup.string()
    .trim()
    .required("Education Background ID is required"),
  school: Yup.string().trim().required("School Name is required"),
  degree: Yup.string().trim().required("Degree is required"),
  study: Yup.string().trim().required("Study is required"),
  startMotnh: Yup.string().trim().required("Start Month is required"),
  startYear: Yup.string().trim().required("Start year is required"),
  endMonth: Yup.string().trim().required("End Month is required"),
  endYear: Yup.number().min(
    Yup.ref("startYear"),
    "End Year Can't be earlier than start date"
  ),
});

export const DeleteValidationEducationBackground = Yup.object().shape({
  educationId: Yup.string()
    .trim()
    .required("Education Background ID is required"),
});
