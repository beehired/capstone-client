import { gql, TypedDocumentNode } from "@apollo/client";

export const CreateSkill: TypedDocumentNode = gql`
  mutation CreateSkills($input: SkillInput!) {
    createSkills(input: $input) {
      ... on ErrorObject {
        code
        message
      }
      ... on skills {
        skillsID
        skills
      }
    }
  }
`;

export const DeleteSkill: TypedDocumentNode = gql`
  mutation DeleteSkills($skillsId: ID!) {
    deleteSkills(skillsID: $skillsId) {
      skillsID
      skills
    }
  }
`;

export const UpdateSkill: TypedDocumentNode = gql`
  mutation UpdateSkills($skillsId: ID!, $input: SkillInput!) {
    updateSkills(skillsID: $skillsId, input: $input) {
      skillsID
      skills
    }
  }
`;

export const AddSkillToProfileByID: TypedDocumentNode = gql`
  mutation AddSkillToProfile($profileId: ID!, $skills: [String]) {
    addSkillToProfile(profileID: $profileId, skills: $skills) {
      profileID
    }
  }
`;

export const RemovedSkillToProfileByID: TypedDocumentNode = gql`
  mutation RemovedSkillToProfile($profileId: ID!, $skillsId: ID!) {
    removedSkillToProfile(profileID: $profileId, skillsID: $skillsId) {
      profileID
    }
  }
`;
