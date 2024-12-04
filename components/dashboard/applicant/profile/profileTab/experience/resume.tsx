"use client";
import ToastNotification from "@/components/notification";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { CreateResume, DeleteResume } from "@/util/Mutation/resume.mutation";
import { useMutation as ApolloMutation } from "@apollo/client";
import { useMutation as TansStackMutation } from "@tanstack/react-query";
import React, { SyntheticEvent, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import styles from "@/styles/dashboard/applicant/profile/resume.module.scss";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { RegularPoppins } from "@/components/typograhy";
import { format } from "date-fns";
import { TbAlertCircleFilled, TbPdf, TbTrash, TbUpload } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetMyResumeList } from "@/util/Query/resume";
import { isEmpty } from "lodash";
import { Formatter } from "@/util/formatter";
import { queryClient } from "@/lib/provider";
import Spinner from "@/components/spinner";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { useFormik } from "formik";

export default function Resume({ id }: { id: string }) {
  const [fileUpload, setFileUpload] = useState<File | null>();
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

  const onHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
  };

  const { data: ResumeData, isLoading: ResumeisLoading } = useQuery({
    queryKey: ["GetMyResume", id],
    queryFn: async () => {
      const { getAllResumyByProfileID } = await GraphQLRequest(
        GetMyResumeList,
        {
          profileId: id,
        }
      );

      return getAllResumyByProfileID;
    },
  });

  const mutation = TansStackMutation({
    mutationKey: ["DeleteResume", id],
    mutationFn: async (inputValues: { resumeId: string }) => {
      return await GraphQLRequest(DeleteResume, inputValues);
    },
    onSuccess: (data) => {
      toast.success("Successfully Resume Deleted");
      setDeleteToggle(false);
      queryClient.invalidateQueries({
        queryKey: ["GetMyResume", id],
      });
    },
  });

  const { isSubmitting, handleSubmit } = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      await mutation.mutateAsync({
        resumeId: ResumeData[0].resumeID,
      });
      setSubmitting(false);
    },
  });

  const [mutate, { data, loading }] = ApolloMutation(CreateResume, {
    variables: {
      profileId: id,
      file: fileUpload,
    },
    onCompleted: () => {
      toast.success("Successfully Upload");
      setFileUpload(null);
      queryClient.invalidateQueries({
        queryKey: ["GetMyResume", id],
      });
    },
  });

  const onHandleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate();
  };

  const removedFileUpload = () => {
    setFileUpload(null);
  };
  return (
    <div className={styles.container}>
      <ToastNotification />
      {deleteToggle ? (
        <Dialog>
          <Prompt
            title="Do you want to delete?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={PromptStyles.header}>
              <span>
                Are you sure you want to delete this resume file? Once deleted,
                it cannot be recovered, and you will lose all associated
                information. Please confirm if you wish to proceed with the
                deletion.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleDeleteToggle} name="Cancel" />
              )}
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


      {
        fileUpload ? (
          <div className={styles.file}>
            <div className={styles.pdf}>
              <TbPdf size={35} />
            </div>
            <div className={styles.details}>
              <span className={RegularPoppins.className}>
                {fileUpload.name}
              </span>
              <span className={RegularPoppins.className}>
                {format(new Date(fileUpload.lastModified), "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
        ) :
          <div className={styles.fileUpload}>
            <Dropzone
              onDropRejected={(err) => {
                console.log("Error:", err); // Check if this logs
                toast.error("Invalid File Format");
              }}
              onDrop={(acceptedFiles) => setFileUpload(acceptedFiles[0])}
              accept={{
                "application/pdf": [".pdf"],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={styles.uploading}>
                      <TbUpload size={45} />
                    </div>
                    <p className={RegularPoppins.className}>
                      Drag and Drop your resume, or click to select files (PDF only)
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
      }
      {fileUpload ? (
        <div className={styles.formContainer}>
          <form onSubmit={onHandleSubmit}>
            <CancelBtn onClose={removedFileUpload} name="Cancel" />
            <PrimaryButton
              type="submit"
              loading={loading ? true : false}
              name="Submit"
            />
          </form>
        </div>
      ) : null}
      {isEmpty(ResumeData) ? (
        ResumeisLoading ? (
          <Spinner />
        ) : null
      ) : (
        ResumeData.map(
          ({
            title,
            resumeID,
            createdAt,
          }: {
            title: string;
            resumeID: string;
            createdAt: any;
          }) => (
            <div className={styles.file} key={resumeID}>
              <div className={styles.info}>
                <div className={styles.pdf}>
                  <TbPdf size={28} />
                </div>
                <div className={styles.details}>
                  <span className={RegularPoppins.className}>{title}</span>
                  <span className={RegularPoppins.className}>
                    Uploaded On: {Formatter(createdAt)}
                  </span>
                </div>
              </div>
              <div className={styles.deleteBtn}>
                <button aria-label="trash" name="trash" onClick={onHandleDeleteToggle}>
                  <TbTrash size={22} />
                </button>
              </div>
            </div>
          )
        )
      )}


    </div>
  );
}
