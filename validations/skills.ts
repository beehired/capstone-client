import * as Yup from "yup";

export const AddSkillsValidation = Yup.object().shape({
  skills: Yup.string()
    .trim()
    .required("Skill is required")
    .min(1, "It should be minimum of 1 letter"),
});

export const UpdateSkillsValidation = Yup.object().shape({
  skills: Yup.string()
    .trim()
    .required("Skill is required")
    .min(1, "It should be minimum of 1 letter"),
});

export const DeleteSkillsValidation = Yup.object().shape({
  skillsId: Yup.string().required("Skills ID is required"),
});
