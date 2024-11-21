import * as Yup from "yup";

export const GenerateReportValidationSchema = Yup.object().shape({
  startDate: Yup.string().trim().required("Start Date is required"),
  endDate: Yup.string().trim().required("End Date is required"),
});
