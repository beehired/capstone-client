export type UserReviewTypes = {
  review: string;
  rating: number;
  userId: string;
  companyId: string;
};

export type CompanyReviewTypes = {
  review: string;
  rating: number;
  companyId: number;
  userId: string;
};
