import * as Yup from "yup";

export const ApplyNow = Yup.object().shape({
  resumeID: Yup.string().trim().required("Resume is required"),
});
