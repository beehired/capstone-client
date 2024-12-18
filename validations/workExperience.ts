import * as Yup from "yup";

export const CreateWorkExperienceValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required").max(100),
  description: Yup.string().trim().max(1000, "The max is only 1000 Characters"),
  companyName: Yup.string().trim().required("Company Name is required"),
  employmentType: Yup.string().trim().required("Employment Type is required"),
  working: Yup.boolean(),
  startMonth: Yup.string().trim().required("Month is required"),
  startYear: Yup.number().required("Year is required"),
  endMonth: Yup.string()
    .nullable()
    .when("working", {
      is: false,
      then: () => Yup.string().trim().required("Month is required"),
      otherwise: () => Yup.string().nullable(),
    }),
  endYear: Yup.number()
    .nullable()
    .when("working", {
      is: false,
      then: () =>
        Yup.number()
          .required("End year is required")
          .min(
            Yup.ref("startYear"),
            "End Year can’t be earlier than start date"
          )
          .max(
            new Date().getFullYear(),
            "End year cannot be greater than the current year"
          ),
      otherwise: () =>
        Yup.number()
          .min(
            Yup.ref("startYear"),
            "End Year can’t be earlier than start date"
          )
          .max(
            new Date().getFullYear(),
            "End year cannot be greater than the current year"
          ),
    }),
  location: Yup.string().trim().required("Location is required"),
  locationType: Yup.string().trim().required("Location Type is required"),
  skills: Yup.array(Yup.string())
    .min(3, "Add at least three (3) skill")
    .required("Skills is required"),
});

export const UpdateWorkExperienceValidationSchema = Yup.object().shape({
  portfolioID: Yup.string().trim().required("Portfolio ID is required"),
  title: Yup.string().trim().required("Title is required").max(100),
  description: Yup.string().trim().max(1000, "The max is only 1000 Characters"),
  companyName: Yup.string()
    .trim()
    .required("Company Name is required")
    .max(100),
  employmentType: Yup.string().trim().required("Employment Type is required"),
  working: Yup.boolean(),
  startMonth: Yup.string().trim().required("Month is required"),
  startYear: Yup.string().trim().required("Year is required"),
  endMonth: Yup.string()
    .nullable()
    .when("working", {
      is: false,
      then: () => Yup.string().trim().required("Month is required"),
      otherwise: () => Yup.string().nullable(),
    }),
  endYear: Yup.number()
    .nullable()
    .when("working", {
      is: false,
      then: () =>
        Yup.number()
          .required("End year is required")
          .min(
            Yup.ref("startYear"),
            "End Year can’t be earlier than start date"
          )
          .max(
            new Date().getFullYear(),
            "End year cannot be greater than the current year"
          ),
      otherwise: () =>
        Yup.number()
          .min(
            Yup.ref("startYear"),
            "End Year can’t be earlier than start date"
          )
          .max(
            new Date().getFullYear(),
            "End year cannot be greater than the current year"
          ),
    }),
  location: Yup.string().trim().required("Location is required"),
  locationType: Yup.string().trim().required("Location Type is required"),
  skills: Yup.array(Yup.string())
    .min(3, "Add at least three (3) skill")
    .required("Skills are required"),
});
