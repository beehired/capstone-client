import * as Yup from "yup";

export let CreateJobValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Job Title is required"),
  description: Yup.string().trim().required("Job Description is required"),
  location: Yup.string()
    .oneOf(["On site", "Remote", "Hybrid"])
    .required("Location is required"),
  duration: Yup.string().trim().required("Duration is required"),
  employment: Yup.string().trim().required("Employment Type is required"),
  fixed: Yup.boolean().required("Fix this"),
  salary: Yup.number().when("fixed", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Fixed price should not less than to 1")
        .required("Fixed price is required"),
  }),
  min: Yup.number().when("fixed", {
    is: false,
    then: () =>
      Yup.number()
        .min(1, "The minimum salary cannot be less than 0")
        .required("Minimum salary is required"),
  }),
  max: Yup.number().when("fixed", {
    is: false,
    then: () =>
      Yup.number()
        .moreThan(
          Yup.ref("min"),
          "Maximum salary must be greater than minimum salary"
        )
        .required("Maximum salary is required"),
  }),
  agreement: Yup.mixed().required("File Upload is required"),
  currency: Yup.string().required("Currency is required"),
  jobType: Yup.array()
    .of(Yup.string())
    .min(1, "Job Type is required")
    .required("Job Type is required"),
  skills: Yup.array(Yup.string())
    .min(1, "Add at least one (1) skill")
    .required("Skills are required"),
});

export const JobDeleteValidation = Yup.object().shape({
  id: Yup.string().trim().required("ID is required"),
});

export const UpdateJobPostSchema = Yup.object().shape({
  jobPostId: Yup.string().trim().required("Job Post ID is required"),
  title: Yup.string().trim().required("Job Title is required"),
  description: Yup.string().trim().required("Job Description is required"),
  location: Yup.string().trim().required("Location is required"),
  duration: Yup.string().trim().required("Duration is required"),
  employment: Yup.string().trim().required("Employment Type is required"),
  fixed: Yup.boolean().required("Fix this"),
  salary: Yup.number().when("fixed", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Fixed price should not less than to 1")
        .required("Salary is required"),
    otherwise: () => Yup.number().required("Salary is required"),
  }),
  min: Yup.number().when("fixed", {
    is: false,
    then: () => Yup.number().min(1, "The minimum salary cannot be less than 0"),
  }),
  max: Yup.number().when("fixed", {
    is: false,
    then: () =>
      Yup.number().moreThan(
        Yup.ref("min"),
        "Maximum salary must be greater than minimum salary"
      ),
  }),
  currency: Yup.string().required("Currency is required"),
  jobType: Yup.array()
    .of(Yup.string())
    .min(1, "Job Type is required")
    .required("Job Type is required"),
  skills: Yup.array(Yup.string())
    .min(1, "Add at least one (1) skill")
    .required("Skills are required"),
});

export const ReportJobPost = Yup.object().shape({
  jobPostID: Yup.string().trim().required("JobPostID is required"),
  userID: Yup.string().trim().required("UserID is required"),
  message: Yup.string().trim().required("Report Message is required"),
});

export const JobSettingValidation = Yup.object().shape({
  jobPostId: Yup.string().trim().required("JobPostID is required"),
  applicationStatus: Yup.string()
    .oneOf(["Open", "Close"])
    .required("Appliation Status is required"),
  status: Yup.string()
    .oneOf(["Published", "Draft"])
    .required("Job Status is required"),
});
