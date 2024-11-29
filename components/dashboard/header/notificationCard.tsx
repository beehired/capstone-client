"use client";

import React, { useState } from "react";
import styles from "@/styles/components/notificationCard.module.scss";
import { RegularPoppins } from "@/components/typograhy";
import { format, formatDistanceToNow } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import {
  UpdateNotification,
  ArchiveNotification,
} from "@/util/Mutation/notification.mutation";
import { queryClient } from "@/lib/provider";
import Dialog from "@/components/dialog";
import { TbAlertCircleFilled, TbTrash, TbX } from "react-icons/tb";
import Image from "next/legacy/image";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { useFormik } from "formik";
import { CancelBtn, PrimaryButton } from "@/components/button";
import BeeHiredLogo from "@/app/public/beehired.png";
import { isEmpty } from "lodash";

export default function NotificationCard({
  title,
  notificationID,
  status,
  date,
  application,
  company,
  schedule,
}: any) {
  const [archive, setArchive] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);

  const mutation = useMutation({
    mutationKey: ["UpdateNotificaion", notificationID],
    mutationFn: async (inputValues: { notificationId: string }) => {
      return await GraphQLRequest(UpdateNotification, inputValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    },
  });

  const onHandleArchiveToggle = () => {
    setArchive(() => !archive);
  };

  const mutationNotificaion = useMutation({
    mutationKey: ["ArchiveNotification", notificationID],
    mutationFn: async (inputValues: { notificationId: string }) => {
      return await GraphQLRequest(ArchiveNotification, inputValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    },
  });

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      notificationId: notificationID,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutationNotificaion.mutateAsync({
        notificationId: values.notificationId,
      });
    },
  });
  return (
    <div
      className={`${styles.container} ${status ? styles.read : styles.unread}`}
    >
      {toggleNotification ? (
        <Dialog>
          <div className={styles.dialog}>
            <div className={styles.dialogContainer}>
              <div className={styles.diaglogHeader}>
                <div>
                  <button onClick={onHandleArchiveToggle}>
                    <TbTrash size={23} />
                  </button>
                </div>
                <button
                  onClick={() =>
                    setToggleNotification(() => !toggleNotification)
                  }
                >
                  <TbX size={23} />
                </button>
              </div>
              <div className={styles.companyHeader}>
                {isEmpty(application?.jobPost) && isEmpty(schedule) ? (
                  <div className={styles.companyInfo}>
                    <Image src={BeeHiredLogo} alt="" width={120} height={120} />
                    <span>
                      <h2 className={RegularPoppins.className}>
                        BeeHired System
                      </h2>
                    </span>
                  </div>
                ) : (
                  <div className={styles.companyInfo}>
                    {application?.jobPost && (
                      <>
                        <Image
                          src={application?.company?.logo?.media}
                          alt=""
                          width={120}
                          height={120}
                        />
                        <span>
                          <h2 className={RegularPoppins.className}>
                            {application?.company?.companyName}
                          </h2>
                        </span>
                      </>
                    )}
                    {schedule && (
                      <>
                        <Image
                          src={company?.logo?.media}
                          alt=""
                          width={120}
                          height={120}
                        />
                        <span>
                          <h2 className={RegularPoppins.className}>
                            {company?.companyName}
                          </h2>
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
              {["submitted", "Congratulation", "review", "Declined"].some(
                (keyword) => title.includes(keyword)
              ) ? (
                <div className={styles.applicationScore}>
                  <h2 className={RegularPoppins.className}>
                    Your Application ID is {application?.id}
                  </h2>
                  <span className={RegularPoppins.className}>
                    Skill Match:  {application?.score?.score}%
                  </span>
                </div>
              ) : isEmpty(schedule) || schedule ? null : "The job post has been deleted due to multiple reports of policy violations. This action is final, and all associated data has been permanently removed. If you believe this was done in error or need further assistance, please contact our support team for more details."}



              {["Created", "Reschedule"].some(
                (keyword) => schedule && title.includes(keyword)
              ) ? (
                <div className={styles.applicationScore}>
                  <span>
                    Start Date:{" "}
                    {format(new Date(schedule?.startDate), "MMMM dd, yyyy")} -{" "}
                    {schedule?.startTime}
                  </span>
                  <span>
                    End Date:{" "}
                    {format(new Date(schedule?.endDate), "MMMM dd, yyyy")} -{" "}
                    {schedule?.endTime}
                  </span>
                </div>
              ) : application?.jobPost ? null : (
                <span className={RegularPoppins.className}>
                  This schedule is not found. Please contact our support team
                  for assistance.
                </span>
              )}
            </div>
          </div>
        </Dialog>
      ) : null}
      {archive ? (
        <Dialog>
          <Prompt
            title="Do you want to delete this notification?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={PromptStyles.header}>
              <span>
                Are you sure you want to delete this notification? Once deleted,
                it cannot be recovered, and you will lose all associated
                information. Please confirm if you wish to proceed with the
                deletion.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleArchiveToggle} name="Cancel" />
              )}
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  name="Submit"
                  loading={isSubmitting ? true : false}
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      <div
        onClick={() => {
          setToggleNotification(true);
          mutation.mutate({
            notificationId: notificationID,
          });
        }}
        className={styles.cardContainer}
      >
        <div>
          <h2 className={RegularPoppins.className}>{title}</h2>
          <span>
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
