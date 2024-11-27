"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard/admin/skills.module.scss";
import { TbAlertCircleFilled, TbEdit, TbTrash } from "react-icons/tb";
import { format } from "date-fns";
import { MediumPoppins, RegularPoppins } from "@/components/typograhy";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { CancelBtn, DeleteBtn, PrimaryButton } from "@/components/button";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { DeleteSkill, UpdateSkill } from "@/util/Mutation/skill.mutation";
import { DeleteSkills, UpdateSkills } from "@/types/skills.type";
import { toast } from "react-hot-toast";
import { queryClient } from "@/lib/provider";
import ToastNotification from "@/components/notification";
import { InputV1 } from "@/components/input";
import { UpdateSkillsValidation } from "@/validations/skills";

export default function SkillsCard({
  skills,
  createdAt,
  id,
}: {
  skills: string;
  createdAt: any;
  id: any;
}) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const onHandleToggleDeleteBtn = () => {
    setToggleDelete(() => !toggleDelete);
  };

  const oHandleEditToggle = () => {
    setToggleEdit(() => !toggleEdit);
  };

  const deleteMutation = useMutation({
    mutationKey: ["DeleteSkill"],
    mutationFn: async (inputValues: DeleteSkills): Promise<any> => {
      return await GraphQLRequest(DeleteSkill, inputValues);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["GetSkills"],
      });
    },
  });

  const editMutation = useMutation({
    mutationKey: ["EditSkill"],
    mutationFn: async (inputValues: UpdateSkills): Promise<any> => {
      return await GraphQLRequest(UpdateSkill, inputValues);
    },
    onSuccess: (data, variables, context) => {
      if (data.updateSkills.skillsID) {
        toast.success("Successfully Updated");
        queryClient.invalidateQueries({
          queryKey: ["GetSkills"],
        });
      }
    },
  });

  const { handleSubmit: DeleteSubmission } = useFormik({
    initialValues: {
      id: id,
    },
    onSubmit: async (values, { setSubmitting }) => {
      await deleteMutation.mutateAsync({
        skillsId: values.id,
      });
      setSubmitting(false);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange, isSubmitting } =
    useFormik({
      initialValues: {
        id: id,
        skills: skills,
      },
      validationSchema: UpdateSkillsValidation,
      onSubmit: async (values, { setSubmitting }) => {
        await editMutation.mutateAsync({
          input: {
            skills: values.skills,
          },

          skillsId: values.id,
        });
        setSubmitting(false);
      },
    });
  return (
    <div className={styles.tr}>
      {toggleDelete ? (
        <Dialog>
          <Prompt
            title="Do you wish to Continue"
            icon={<TbAlertCircleFilled size={30} />}
          >
            <span
              className={`${PromptStyles.text} ${RegularPoppins.className}`}
            >
              Are you sure you want to delete this skill? Please confirm if you
              wish to proceed with the deletion of this specific skill.
            </span>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={onHandleToggleDeleteBtn} name="Cancel" />
              <form onSubmit={DeleteSubmission}>
                <DeleteBtn />
              </form>
            </div>
          </Prompt>
          <ToastNotification />
        </Dialog>
      ) : null}
      {toggleEdit ? (
        <Dialog>
          <Prompt title="Edit Skills">
            <div className={PromptStyles.body}>
              <InputV1
                name="skills"
                value={values.skills}
                type="text"
                placeholder={values.skills}
                onChange={handleChange}
                errors={errors.skills}
                touched={touched.skills}
              />
            </div>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={oHandleEditToggle} name="Cancel" />
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  name="Submit"
                  loading={isSubmitting ? true : false}
                  type="submit"
                />
              </form>
            </div>

            <ToastNotification />
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.td}>
        <span className={RegularPoppins.className}>{skills}</span>
      </div>
      <div className={styles.td}>
        <span>{format(new Date(createdAt), "MMM dd, yyyy")}</span>
      </div>
      <div className={styles.td}>
        <div className={styles.actionsBtnGrp}>
          <button onClick={oHandleEditToggle} className={styles.edit}>
            <TbEdit size={20} />
          </button>
          <button
            onClick={onHandleToggleDeleteBtn}
            className={styles.deleteBtn}
          >
            <TbTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
