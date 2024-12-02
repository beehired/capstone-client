"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard/settings/security.module.scss";
import { RegularPoppins } from "@/components/typograhy";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { useFormik } from "formik";
import { InputV2 } from "@/components/input";
import { TbEye, TbEyeOff, TbLock } from "react-icons/tb";
import { ResetPasswordSchema } from "@/validations/forgotpass";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { UpdateUserAccountPassword } from "@/util/Mutation/auth.mutation";
import { UpdatePasswordTypes } from "@/types/auth.types";
import store from "store2";
import toast from "react-hot-toast";
import { DeacMyAcc } from "@/util/Mutation/user.mutation";
import { ActivityLogs } from "@/util/Mutation/activityLogs";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function SecuritySettings() {
  const router = useRouter();
  const user = store.get("UserAccount");
  const [deactivate, setDeactivate] = useState(false);
  const [change, setChange] = useState(false);
  const [onToggle, setToggle] = useState(false);

  const onHandlePassword = () => {
    setChange(() => !change);
  };

  const onHandleDeactivation = () => {
    setDeactivate(() => !deactivate);
  };

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

  const ChangePassMutation = useMutation({
    mutationKey: ["ChangePassword"],
    mutationFn: async (inputValues: UpdatePasswordTypes) => {
      return GraphQLRequest(UpdateUserAccountPassword, inputValues);
    },
    onSuccess: (data: any) => {
      if (data.updateUserPasswordAccount.userID) {
        toast.success("Successfully Changed Password");
      }
      if (data.updateUserPasswordAccount.code) {
        toast.error(data.updateUserPasswordAccount.message);
      }
    },
  });

  const DeactiveAcc = useMutation({
    mutationKey: ["DeactivationAccount"],
    mutationFn: async (inputValues: { userId: string }) => {
      return await GraphQLRequest(DeacMyAcc, inputValues);
    },
    onSuccess: (data: any) => {
      toast.success("Account Successfully Deactivated");
      LogoutMutation.mutateAsync({
        userId: user?.id,
      });
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit: ChangePass,
    handleChange,
    isSubmitting: isPassword,
  } = useFormik({
    initialValues: {
      newpass: "",
      retypepass: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async () => {
      await ChangePassMutation.mutateAsync({
        userId: user?.id,
        password: values.newpass,
      });
    },
  });

  const { handleSubmit: DeactivationAccount, isSubmitting } = useFormik({
    initialValues: {
      userId: user?.id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await DeactiveAcc.mutateAsync({
        userId: values.userId,
      });
    },
  });

  return (
    <div className={styles.container}>
      {deactivate ? (
        <Dialog>
          <Prompt title="Do you want to Deactivate your account?">
            <div className={PromptStyles.headers}>
              <span>
                Are you sure you want to deactivate your account? This action
                will temporarily suspend your account and all associated data.
                You can reactivate it anytime by logging back in.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={onHandleDeactivation} name="Cancel" />
              <form onSubmit={DeactivationAccount}>
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
      {change ? (
        <Dialog>
          <Prompt title="Change Password">
            <div className={PromptStyles.inputHeader}>
              <InputV2
                toggle={onToggle}
                onToggle={setToggle}
                icon={<TbLock size={23} />}
                icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                type={onToggle ? "text" : "password"}
                name="newpass"
                placeholder="New Password"
                value={values.newpass}
                onChange={handleChange}
                errors={errors.newpass}
                touched={touched.newpass}
              />
              <InputV2
                toggle={onToggle}
                onToggle={setToggle}
                icon={<TbLock size={23} />}
                icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                type={onToggle ? "text" : "password"}
                name="retypepass"
                placeholder="Re-Type Password"
                value={values.retypepass}
                onChange={handleChange}
                errors={errors.retypepass}
                touched={touched.retypepass}
              />
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandlePassword} name="Cancel" />
              )}
              <form onSubmit={ChangePass}>
                <PrimaryButton
                  loading={isPassword ? true : false}
                  name="Confirm"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.securityCard}>
        <h2>Change Acount Password</h2>
        <button aria-label="button" onClick={onHandlePassword}>
          <span className={RegularPoppins.className}>Change Password</span>
        </button>
      </div>
      <div className={styles.securityCard}>
        <h2>Account Deactivation</h2>
        <button aria-label="button" onClick={onHandleDeactivation}>
          <span className={RegularPoppins.className}>Deactivate</span>
        </button>
      </div>
    </div>
  );
}
