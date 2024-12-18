import * as Yup from "yup";

export const ProjectDetailsSchema = Yup.object().shape({
  projectId: Yup.string().required("Project ID is required"),
  title: Yup.string().trim().required("Title is required"),
  amount: Yup.number().required("Amount is required"),
  startDate: Yup.mixed().required("Start Date is required"),
  endDate: Yup.mixed()
    .required("End Date is required")
    .test(
      "is-greater",
      "End Date cannot be earlier or the same as the Start Date",
      function (value: any) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) > new Date(startDate);
      }
    ),
});

export const ProjectStatusSchema = Yup.object().shape({
  projectId: Yup.string().required("Project ID is required"),
  status: Yup.string().trim().required("Status is required"),
});
