import * as Yup from "yup";

export const CreateValidationProfileTheme = Yup.object().shape({
  userId: Yup.string().trim().required("User ID is required"),
  theme: Yup.string().trim().required("Theme name is required").max(50),
  upload: Yup.mixed().required("Image Uplaod is required"),
});
