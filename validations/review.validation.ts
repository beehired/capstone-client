import * as Yup from "yup";

export const CompanyReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating is required")
    .required("Rating is required"),
  review: Yup.string().trim().required("Review is required"),
  companyId: Yup.string().trim().required("Company ID is required"),
});

export const UserReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating is required")
    .required("Rating is required"),
  review: Yup.string().trim().required("Review is required"),
  userId: Yup.string().trim().required("User ID is required"),
});
