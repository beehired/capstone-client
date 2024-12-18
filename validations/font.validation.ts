import * as Yup from "yup";

export const CreateValidatioNFontFamily = Yup.object().shape({
  font: Yup.string().trim().required("Font name is required").max(50),
  upload: Yup.mixed().required("Image upload required"),
  userId: Yup.string().trim().required("User ID is required"),
});
