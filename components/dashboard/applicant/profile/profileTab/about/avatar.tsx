"use client";

import React, { useState } from "react";
import { useMutation as TanstackMutation } from "@tanstack/react-query";
import styles from "@/styles/dashboard/applicant/profile/avatar.module.scss";
import store from "store2";
import toast from "react-hot-toast";
import { TbAlertCircleFilled, TbTrash } from "react-icons/tb";
import Spinner from "@/components/spinner";
import { isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetMyUserProfile } from "@/util/Query/user.query";
import { useFormik } from "formik";
import Image from "next/image";
import DefaultImage from "@/app/public/l60Hf.png";
import Dialog from "@/components/dialog";
import AvatarModule from "@/components/dashboard/Avatar/avatar";
import Prompt from "@/components/prompt";
import { CancelBtn, PrimaryButton } from "@/components/button";

import PromptStyles from "@/styles/components/prompt.module.scss";
import { queryClient } from "@/lib/provider";
import { DeleteProfileAvatar } from "@/util/Mutation/profile.mutation";
import ToastNotification from "@/components/notification";
import { RegularPoppins } from "@/components/typograhy";
export default function Avatar({ id }: { id: string }) {
  const user = store.get("UserAccount");
  const [addToggle, setAddToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const onHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
  };
  const onHandleAddToggle = () => {
    setAddToggle(() => !addToggle);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: async () => {
      const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
        userId: user?.id,
      });

      return getProfileByUser;
    },
  });

  const mutation = TanstackMutation({
    mutationKey: ["DeleteProfileAvatar"],
    mutationFn: async (inputValues: { mediaId: string; profileId: string }) => {
      return await GraphQLRequest(DeleteProfileAvatar, inputValues);
    },
    onSuccess: async () => {
      toast.success("Avatar Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
      });
    },
  });

  const { handleSubmit: DeleteHandleSubmit, isSubmitting } = useFormik({
    initialValues: {
      mediaId: data?.avatar?.mediaID,
      profileId: id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutation.mutateAsync({
        mediaId: values.mediaId,
        profileId: values.profileId,
      });
      setDeleteToggle(false);
    },
  });

  return (
    <div className={styles.container}>
      {addToggle ? (
        <Dialog>
          <AvatarModule id={id} value={addToggle} setValue={setAddToggle} />
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
                Are you sure you want to delete this avatar? This action cannot
                be undone. Please confirm if you would like to proceed
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleDeleteToggle} name="Cancel" />
              )}
              <form onSubmit={DeleteHandleSubmit}>
                <PrimaryButton
                  loading={isSubmitting ? true : false}
                  name="Submit"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
          <ToastNotification />
        </Dialog>
      ) : null}
      <div className={styles.info}>
        <div className={styles.avatar}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Image
              src={
                isEmpty(data?.avatar?.media)
                  ? DefaultImage
                  : data?.avatar?.media
              }
              alt=""
              priority
              blurDataURL={data?.avatar?.media}
              fill
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
        {/* <h2 className={RegularPoppins.className}>{isLoading ? <Spinner /> : `${data?.firstname} ${data?.lastname}`}</h2> */}
      </div>
      <div className={styles.btnGrp}>
        {isEmpty(data?.avatar) ? (
          <button onClick={onHandleAddToggle} className={styles.change}>
            <span className={RegularPoppins.className}>
              {data?.avatar ? `Change Profile` : `Upload your image`}
            </span>
          </button>
        ) : null}
        {isEmpty(data?.avatar) ? null : (
          <button onClick={onHandleDeleteToggle} className={styles.removed}>
            <TbTrash size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
