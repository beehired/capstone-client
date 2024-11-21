import * as Yup from "yup";

export const CreateValidationAbout = Yup.object().shape({
  bio: Yup.string().trim().required("About is required"),
});

export const UpdateValidationAbout = Yup.object().shape({
  aboutId: Yup.string().trim().required("Profile ID is required"),
  bio: Yup.string().trim().required("About is required"),
});

export const DeleteValidationAbout = Yup.object().shape({
  aboutId: Yup.string().trim().required("About ID is required"),
});
