export type Education = {
  profileId: string;
  input: {
    degree: string;
    school: string;
    study: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
};

export type UpdateEducation = {
  educationId: string;
  input: {
    degree: string;
    school: string;
    study: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
};
