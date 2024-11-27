"use client";
import React from "react";
import styles from "@/styles/dashboard/settings/editEmail.module.scss";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { useFormik } from "formik";
import { ChangeEmailAddresses } from "@/util/Mutation/user.mutation";
import { useMutation } from "@tanstack/react-query";
import store from "store2";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import toast from "react-hot-toast";
import ToastNotification from "@/components/notification";
import { InputV1 } from "@/components/input";
import { ChangeEmaillAddressSchema } from "@/validations/changeEmailAddress.validation";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ActivityLogs } from "@/util/Mutation/activityLogs";

export default function EditEmail({ close }: any) {
  const user = store.get("UserAccount");
  const router = useRouter();

  const LogoutMutation = useMutation({
    mutationKey: ["LoggedOut"],
    mutationFn: async (inputValues: { userId: any }) => {
      return await GraphQLRequest(ActivityLogs, inputValues);
    },
    onSuccess: async () => {
      toast.success("Successfully Logged Out!");
      store.remove("UserAccount");
      deleteCookie("access_token");
      router.push("/");
    },
  });

  const mutation = useMutation({
    mutationKey: ["ChangeEmailAddress", user?.id],
    mutationFn: async (inputValues: { userId: string; email: string }) => {
      return await GraphQLRequest(ChangeEmailAddresses, inputValues);
    },
    onSuccess: (data) => {
      if (data.ChangeEmailAddress.code) {
        toast.error(data.ChangeEmailAddress.message);
      }

      if (data.ChangeEmailAddress.userID) {
        toast.success("Successfully Email Changed");
        LogoutMutation.mutateAsync({
          userId: user?.id,
        });
      }
    },
  });

  const { handleSubmit, handleChange, errors, values, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        userId: user?.id,
      },
      validationSchema: ChangeEmaillAddressSchema,
      enableReinitialize: true,
      onSubmit: async () => {
        await mutation.mutateAsync({
          email: values.email,
          userId: values.userId,
        });
      },
    });
  return (
    <div className={styles.container}>
      <Prompt title="Change Email Addess">
        <div className={PromptStyles.header}>
          <InputV1
            name="email"
            onChange={handleChange}
            placeholder="johndoe@example.com"
            type="text"
            value={values.email}
            errors={errors.email}
            touched={touched.email}
          />
        </div>
        <div className={PromptStyles.footer}>
          <CancelBtn onClose={close} name="Cancel" />
          <form onSubmit={handleSubmit}>
            <PrimaryButton
              loading={isSubmitting ? true : false}
              name="Submit"
              type="submit"
            />
          </form>
        </div>
      </Prompt>
      <ToastNotification />
    </div>
  );
}
