"use client";

import React, { useState } from "react";
import styles from "@/styles/dashboard/applicant/profile/module/education.card.module.scss";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { RegularPoppins } from "@/components/typograhy";
import {
  ButtonIconToggle,
  CancelBtn,
  PrimaryButton,
} from "@/components/button";
import { TbAlertCircleFilled, TbEdit, TbTrash } from "react-icons/tb";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { useFormik } from "formik";
import EducationEdit from "./educationEdit";
import { DeleteEducationBackground } from "@/util/Mutation/education.mutation";
import toast from "react-hot-toast";
import { DeleteValidationEducationBackground } from "@/validations/education";
import { queryClient } from "@/lib/provider";

interface Education {
  educationID: string;
  degree: string;
  endMonth: string;
  endYear: string;
  school: string;
  startMonth: string;
  startYear: string;
  study: string;
}

export default function EducationCard({
  educationID,
  degree,
  endMonth,
  endYear,
  school,
  startMonth,
  startYear,
  study,
}: Education) {
  const [editToggle, setEditToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const mutation = useMutation({
    mutationKey: ["EducationBackgroundDelete", educationID],
    mutationFn: async (inputValues: { educationId: string }) => {
      return await GraphQLRequest(DeleteEducationBackground, inputValues);
    },
    onSuccess(data, variables, context) {
      if (data.deleteEducationBackground.educationID) {
        toast.success("Successfully Deleted");
        queryClient.invalidateQueries({
          queryKey: ["EducationBackgroud"],
        });
        setDeleteToggle(() => false);
      }
    },
  });

  const onHandleEditToggle = () => {
    setEditToggle(() => !editToggle);
  };

  const onHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
  };

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      educationId: educationID,
    },
    validationSchema: DeleteValidationEducationBackground,
    onSubmit: async (values, { setSubmitting }) => {
      await mutation.mutateAsync({
        educationId: values.educationId,
      });
      setSubmitting(false);
    },
  });
  return (
    <div key={educationID} className={styles.container}>
      {editToggle ? (
        <Dialog>
          <EducationEdit
            id={educationID}
            value={editToggle}
            setValue={setEditToggle}
          />
        </Dialog>
      ) : null}
      {deleteToggle ? (
        <Dialog>
          <Prompt
            title="Do you want to delete?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={styles.header}>
              <span>
                Are you sure you want to delete this educational background from
                your profile? Once removed, all related information, such as
                your degree, will be permanently deleted and cannot be restored.
                Please confirm if you{"'"}d like to proceed with this action.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleDeleteToggle} name="Cancel" />
              )}
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  loading={isSubmitting ? true : false}
                  name="Submit"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.header}>
        <h2 className={`${RegularPoppins.className} ${styles.title}`}>
          {school}
        </h2>
        <div className={styles.btnGrp}>
          <ButtonIconToggle
            icon={<TbEdit size={23} />}
            value={editToggle}
            setValue={setEditToggle}
          />
          <ButtonIconToggle
            icon={<TbTrash size={23} />}
            value={deleteToggle}
            setValue={setDeleteToggle}
          />
        </div>
      </div>
      <div className={styles.date}>
        <span className={RegularPoppins.className}>
          {degree} in {study}
        </span>
      </div>
      <div className={styles.date}>
        <span className={RegularPoppins.className}>
          {startMonth} {startYear} -{" "}
          {endMonth === null && endYear === null
            ? "Present"
            : `${endMonth} ${endYear}`}
        </span>
      </div>
    </div>
  );
}
