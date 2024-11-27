"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/dashboard/admin/freelanceView.module.scss";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetUserByUserId } from "@/util/Query/user.query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RegularPoppins } from "@/components/typograhy";
import { useFormik } from "formik";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { VerifyMyAccount } from "@/util/Mutation/auth.mutation";
import { queryClient } from "@/lib/provider";
import ToastNotification from "@/components/notification";
import FreelancerDocu from "./freelancerDocu";
import Spinner from "@/components/spinner";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import DefaultImage from "@/app/public/l60Hf.png";
import toast from "react-hot-toast";

export default function FreelanceView({ id }: any) {
  const [editToggle, setEditToggle] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["FreelancerView", id],
    queryFn: async () => {
      const { getUserAccountById } = await GraphQLRequest(GetUserByUserId, {
        userId: id,
      });

      return getUserAccountById;
    },
  });

  const onHandleEditToggle = () => {
    setEditToggle(() => !editToggle);
  };

  const mutation = useMutation({
    mutationKey: ["UpdateFreelancerStatus"],
    mutationFn: async (inputValues: { userId: string }) => {
      return await GraphQLRequest(VerifyMyAccount, inputValues);
    },
    onSuccess: async () => {
      toast.success("Successfully User Verified");
      queryClient.invalidateQueries({
        queryKey: ["Freelancers"],
      });
    },
  });

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      userId: id,
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync({
        userId: values.userId,
      });
    },
  });

  return (
    <div className={styles.container}>
      {editToggle ? (
        <Dialog>
          <Prompt title="Verify Freelancer Status">
            <div className={PromptStyles.header}>
              <span>
                Are you sure you want to verify this freelancer? Once verified,
                this action cannot be undone. Verified freelancers gain
                increased visibility and credibility on our platform, and the
                verification status cannot be reverted to unverified. Please
                confirm that all freelancer details are accurate and up-to-date
                before proceeding. If you’re ready to make this change, click
                ‘Confirm.’ Otherwise, click ‘Cancel’ to go back.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleEditToggle} name="Cancel" />
              )}
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  name="Confirm"
                  loading={isSubmitting ? true : false}
                  type="submit"
                />
              </form>
            </div>
            <ToastNotification />
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <Image
              src={DefaultImage}
              alt=""
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h2 className={RegularPoppins.className}>
            {data?.myProfile.firstname} {data?.myProfile.lastname}
          </h2>
        </div>
        {data?.verified ? null : (
          <button onClick={onHandleEditToggle}>
            <span className={RegularPoppins.className}>Edit Status</span>
          </button>
        )}
      </div>
      <div className={styles.tab}>
        <button>
          <span className={RegularPoppins.className}>Requirement</span>
        </button>
      </div>
      <div className={styles.tabView}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.requirement.map(
            ({ requirementsID, requirement, type, createdAt }: any) => (
              <FreelancerDocu
                key={requirementsID}
                requirement={requirement}
                type={type}
                createdAt={createdAt}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
