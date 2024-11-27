"use client";

import React, { useState } from "react";
import styles from "@/styles/dashboard/sidebar/notificationCard.module.scss";
import Image from "next/image";
import DefaultImage from "@/app/public/l60Hf.png";
import { isEmpty } from "lodash";
import { RegularPoppins } from "@/components/typograhy";
import { format } from "date-fns";
import Dialog from "@/components/dialog";
import { TbTrash, TbX } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import {
  ArchiveNotification,
  UpdateNotification,
} from "@/util/Mutation/notification.mutation";
import { queryClient } from "@/lib/provider";
import parse from "html-react-parser";
import Logo from "@/app/public/beehired.png";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { useFormik } from "formik";
import { CancelBtn, PrimaryButton } from "@/components/button";
import Prompt from "@/components/prompt";
import ToastNotification from "@/components/notification";

export default function NotificationCard({
  notificationID,
  title,
  date,
  application,
  status,
  name,
}: any) {
  const [toggle, setToggle] = useState(false);
  const [archive, setArchive] = useState(false);

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

  const onHandleToggle = () => {
    setToggle(() => !toggle);
    mutation.mutateAsync({
      notificationId: notificationID,
    });
  };
  const onHandleArchiveToggle = () => {
    setArchive(() => !archive);
  };

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
      className={
        status ? `${styles.container} ${styles.unread}` : `${styles.container}`
      }
    >
      {toggle ? (
        <Dialog>
          <div className={styles.dialog}>
            <div className={styles.dialogContainer}>
              <div className={styles.diaglogHeader}>
                <button onClick={onHandleArchiveToggle}>
                  <TbTrash size={23} />
                </button>
                <button onClick={onHandleToggle}>
                  <TbX size={23} />
                </button>
              </div>
              <div className={styles.applicantHeader}>
                {application ? (
                  <div className={styles.avatar}>
                    {application ? (
                      <Image
                        src={
                          isEmpty(application.user?.myProfile?.avatar?.media)
                            ? DefaultImage
                            : application.user?.myProfile.avatar?.media
                        }
                        fill
                        objectFit="cover"
                        objectPosition="center"
                        alt=""
                      />
                    ) : null}
                  </div>
                ) : (
                  <>
                    {" "}
                    <Image
                      src={Logo}
                      alt=""
                      width={150}
                      height={150}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </>
                )}

                <div className={styles.info}>
                  {application ? (
                    <>
                      <span>{title}</span>
                      <span className={RegularPoppins.className}>{name}</span>
                      <span>
                        Applicant ID: {application.id} | Application Score:{" "}
                        {application.score?.score}% |{" "}
                        <a
                          href={`${application?.resume.resume}`}
                          target="_blank"
                        >
                          View my Resume
                        </a>
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={styles.applicantBody}>
                {application ? (
                  <>
                    {!application.jobPost ? (
                      <div>
                        <span className={RegularPoppins.className}>
                          This job post has been deleted and is no longer
                          available. For further information or assistance,
                          please contact our support team.
                        </span>
                      </div>
                    ) : (
                      <>
                        <h2 className={RegularPoppins.className}>
                          {application.jobPost.title}
                        </h2>
                        <div>
                          {parse(application.jobPost.description.slice(0, 500))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <span>
                    A job post has been deleted due to multiple reports of
                    policy violations. This action is final, and all associated
                    data has been permanently removed. If you believe this was
                    done in error or need further assistance, please contact our
                    support team for more details.
                  </span>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      ) : null}
      {archive ? (
        <Dialog>
          <Prompt title="Do you want to delete this notificaion?">
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
      <div onClick={onHandleToggle} className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            {application ? (
              <Image
                src={
                  isEmpty(application.user?.myProfile.avatar?.media)
                    ? DefaultImage
                    : application.user?.myProfile.avatar?.media
                }
                fill
                objectFit="cover"
                objectPosition="center"
                alt=""
              />
            ) : (
              <Image
                src={Logo}
                alt=""
                fill
                objectFit="cover"
                objectPosition="center"
              />
            )}
          </div>
          <div>
            <h2 className={RegularPoppins.className}>{title}</h2>
            <span>{format(new Date(date), "MMMM dd, yyyy")}</span>
          </div>
        </div>
        {status ? null : <div className={styles.unread} />}
      </div>
      <ToastNotification />
    </div>
  );
}
