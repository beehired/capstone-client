import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/dashboard/admin/theme.module.scss";
import PromptStyles from "@/styles/components/prompt.module.scss";

import { RegularPoppins } from "@/components/typograhy";
import { Formatter } from "@/util/formatter";
import { TbAlertCircleFilled, TbEdit, TbTrash } from "react-icons/tb";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { CancelBtn, DeleteBtn, PrimaryButton } from "@/components/button";
import { useMutation as DeleteMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import {
  DeleteProfileTheme,
  UpdateProfileTheme,
} from "@/util/Mutation/theme.mutation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import ToastNotification from "@/components/notification";
import { queryClient } from "@/lib/provider";
import FileUploads from "@/components/fileupload";
import SpanError from "@/components/Error/spanError";
import { InputV1 } from "@/components/input";
import { useMutation } from "@apollo/client";

export default function ThemeCard({
  theme,
  image,
  createdAt,
  themeID,
}: {
  themeID: string;
  theme: string;
  image: string;
  createdAt: any;
}) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);

  const onHandleToggleDeleteBtn = () => {
    setToggleDelete(() => !toggleDelete);
  };

  const oHandleEditToggle = () => {
    setToggleEdit(() => !toggleEdit);
  };

  const [mutate] = useMutation(UpdateProfileTheme);

  const mutation = DeleteMutation({
    mutationKey: ["ThemeDeleted"],
    mutationFn: async (inputValues: { themeId: string }) => {
      return await GraphQLRequest(DeleteProfileTheme, inputValues);
    },
    onSuccess: (data) => {
      toast.success("Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["GetAllThemes"],
      });
    },
  });

  const { handleSubmit: DeleteSubmission } = useFormik({
    initialValues: {
      themeId: themeID,
    },
    onSubmit: async (values) => {
      mutation.mutateAsync({
        themeId: values.themeId,
      });
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    handleChange,
  } = useFormik({
    initialValues: {
      themeId: themeID,
      theme: theme,
      upload: "",
    },
    onSubmit: async () => {
      mutate({
        variables: {
          themeId: values.themeId,
          theme: values.theme,
          file: fileUpload,
        },
        onCompleted: async () => {
          toast.success("Successfully Updated");
          queryClient.invalidateQueries({
            queryKey: ["GetAllThemes"],
          });
        },
      });
    },
  });

  return (
    <div className={styles.tr}>
      {toggleDelete ? (
        <Dialog>
          <Prompt
            title="Do you wish to Continue"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <span
              className={`${PromptStyles.text} ${RegularPoppins.className}`}
            >
              Are you sure you want to delete this theme? Once removed, it
              cannot be recovered, and any related customization will be lost.
              Please confirm if you wish to proceed with the deletion of this
              theme.
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
          <Prompt title="Edit Theme">
            <div className={PromptStyles.body}>
              <FileUploads
                name="file"
                value={values.upload}
                selectedFile={setFileUpload}
                setFieldValue={setFieldValue}
                dragisActive={
                  "Drag and Drop your resume, or click to select files<"
                }
                isNotActive={
                  "Drag and Drop your image, or click to select files"
                }
                componentName="none"
              />
              {errors.upload && touched.upload ? (
                <SpanError message={errors.upload} />
              ) : null}
              <InputV1
                name="theme"
                errors={errors.theme}
                placeholder="Theme name"
                touched={touched.theme}
                type="text"
                value={values.theme}
                onChange={handleChange}
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
          </Prompt>
          <ToastNotification />
        </Dialog>
      ) : null}
      <div className={styles.td}>
        <div className={styles.avatar}>
          <Image src={image} alt="" fill priority objectFit="contain" />
        </div>
      </div>
      <div className={styles.td}>
        <span className={RegularPoppins.className}>{theme}</span>
      </div>
      <div className={styles.td}>
        <span>{Formatter(createdAt)}</span>
      </div>
      <div className={styles.td}>
        <div className={styles.actionsBtnGrp}>
          <button aria-label="button" onClick={oHandleEditToggle} className={styles.edit}>
            <TbEdit size={20} />
          </button>
          <button aria-label="button"
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
