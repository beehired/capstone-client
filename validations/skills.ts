import * as Yup from "yup";

export const AddSkillsValidation = Yup.object().shape({
  skills: Yup.string()
    .trim()
    .required("Skill is required")
    .min(1, "It should be minimum of 1 letter")
    .max(50, "Skills name cannot exceed 50 characters"),
});

export const UpdateSkillsValidation = Yup.object().shape({
  skills: Yup.string()
    .trim()
    .required("Skill is required")
    .min(1, "It should be minimum of 1 letter")
    .max(50, "Skills name cannot exceed 50 characters"),
});

export const DeleteSkillsValidation = Yup.object().shape({
  skillsId: Yup.string().required("Skills ID is required"),
});
