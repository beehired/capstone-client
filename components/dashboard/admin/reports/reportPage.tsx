"use client";

import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetReportById } from "@/util/Query/report.query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import styles from "@/styles/dashboard/admin/reportId.module.scss";
import parse from "html-react-parser";
import Spinner from "@/components/spinner";
import { format } from "date-fns";
import { RegularPoppins } from "@/components/typograhy";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { TbAlertCircleFilled } from "react-icons/tb";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { useFormik } from "formik";
import { DeleteJobPost } from "@/util/Mutation/job.mutation";
import ToastNotification from "@/components/notification";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/provider";

export default function ReportPage() {
  const params = useParams();

  const [toggle, setToggle] = useState(false);

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["GetReportById", params.id],
    queryFn: async () => {
      const { getReportById } = await GraphQLRequest(GetReportById, {
        reportId: params.id,
      });

      return getReportById;
    },
  });

  const mutation = useMutation({
    mutationKey: ["DeleteJobPost"],
    mutationFn: async (inputValues: { jobPostId: string }) => {
      return await GraphQLRequest(DeleteJobPost, inputValues);
    },
    onSuccess: async () => {
      toast.success("Successfully Job Post Deleted");
      queryClient.invalidateQueries({
        queryKey: ["GetReportById"],
      });
    },
  });

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await mutation.mutateAsync({
        jobPostId: data?.jobPost[0].jobPostID,
      });
    },
  });
  return (
    <div className={styles.container}>
      {toggle ? (
        <Dialog>
          <Prompt
            title="Do you want to delete this Job Post?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={PromptStyles.header}>
              <span className={RegularPoppins.className}>
                Are you sure you want to delete this job post? This action is
                permanent and cannot be undone. All associated data, including
                applications, will be permanently removed. Please confirm to
                proceed or cancel to keep the job post active.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={onHandleToggle} name="Cancel" />
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  loading={isSubmitting ? true : false}
                  name="Confirm"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      {isLoading ? (
        <Spinner />
      ) : (
        data?.jobPost.map(
          ({
            reportID,
            title,
            description,
            createdAt,
            duration,
            experience,
            location,
            endDate,
            status,
          }: any) => (
            <div key={reportID}>
              <div className={styles.head}>
                <h2>{title}</h2>
                <button onClick={onHandleToggle}>
                  <span className={RegularPoppins.className}>
                    Delete Job Post
                  </span>
                </button>
              </div>

              <div className={styles.header}>
                <span>
                  <b>Duration:</b> {duration}
                </span>
                <span>
                  <b>Experience Level:</b> {experience}
                </span>
                <span>
                  <b>Location:</b> {location}
                </span>
                <span>
                  <b>Location:</b> {format(new Date(endDate), "MMMM dd, yyyy")}
                </span>
                <span>
                  <b>Status:</b> {status}
                </span>
                <span>
                  <b>Date Posted:</b>{" "}
                  {format(new Date(createdAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <div>{parse(description)}</div>
            </div>
          )
        )
      )}
      <ToastNotification />
    </div>
  );
}
