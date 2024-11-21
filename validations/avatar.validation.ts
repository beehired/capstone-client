import * as Yup from "yup";

export const CreateAvatarValidation = Yup.object().shape({
  upload: Yup.mixed().required("File Upload is required"),
});
