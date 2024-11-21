export type Post = {
  companyId?: string;
  jobPostId?: string;
  input: {
    title: string;
    description: string;
    JobType: string[];
    location: string;
    duration: string;
    experience: string;
  };
  salary: {
    max?: number;
    min?: number;
    fixed?: number;
    currency: string;
  };
  skills: string[];
};

export type PostIdTypes = {
  jobPostId: string;
};

export type ArchiveJobTypes = {
  jobPostId: string;
  boolean: boolean;
};
