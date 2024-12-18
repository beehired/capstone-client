import * as Yup from "yup";

export const CompanyReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating is required")
    .required("Rating is required"),
  review: Yup.string().trim().required("Review is required").max(300),
  companyId: Yup.string().trim().required("Company ID is required"),
});

export const UserReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating is required")
    .required("Rating is required"),
  review: Yup.string().trim().required("Review is required").max(300),
  userId: Yup.string().trim().required("User ID is required"),
});
