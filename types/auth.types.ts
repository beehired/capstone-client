export type Login = {
  email: string;
  password: string;
};

export type FreelancerTypes = {
  input: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  confirmPass?: string;
  requirement: {
    type: string;
  };
  fileUpload: any;
};

export type RecruiterTypes = {
  input: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    plan: string;
    companyName: string;
    companySize: string;
    description: string;
    location: string;
  };
  file: any;
};

export type ForgotPasswordTypes = {
  email: string;
};

export type UpdatePasswordTypes = {
  userId: string | null;
  password: string;
};

export type ResetPasswordLinkTypes = {
  reset: string | any;
};
