"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from "@/styles/dashboard/applicant/profile/header.module.scss";
import ToastNotification from "@/components/notification";
import { useMutation as ApolloMutation } from "@apollo/client";
import {
  useMutation as TansStackMutation,
  useQuery,
} from "@tanstack/react-query";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { RegularPoppins } from "@/components/typograhy";
import Image from "next/image";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { TbAlertCircleFilled, TbTrash, TbUpload } from "react-icons/tb";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { isEmpty } from "lodash";
import { queryClient } from "@/lib/provider";
import Spinner from "@/components/spinner";
import {
  AddProfileHeader,
  DeleteProfileHeader,
} from "@/util/Mutation/profile.mutation";
import {
  ButtonIconToggle,
  CancelBtn,
  PrimaryButton,
} from "@/components/button";
import { GetProfileHeaderByUser } from "@/util/Query/profile.query";
import store from "store2";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { useFormik } from "formik";
export default function ProfileHeader({ id }: { id: string }) {
  const user = store.get("UserAccount");
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
  };

  const { data: ProfileHeaderData, isLoading } = useQuery({
    queryKey: ["ProfileHeader"],
    queryFn: async () => {
      const { getProfileByUser } = await GraphQLRequest(
        GetProfileHeaderByUser,
        {
          userId: user?.id,
        }
      );

      return getProfileByUser;
    },
  });
  const [fileUpload, setFileUpload] = useState<File | null>();
  // const mutation = TansStackMutation()

  const [mutate, { data, loading }] = ApolloMutation(AddProfileHeader);
  const onHandleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({
      variables: {
        profileId: id,
        file: fileUpload,
      },
      onCompleted: () => {
        toast.success("Successfully Profile Header Added");
        setFileUpload(null);
        queryClient.invalidateQueries({
          queryKey: ["ProfileHeader"],
        });
      },
    });
  };

  const removedFileUpload = () => {
    setFileUpload(null);
    setPreview(null);
  };

  const mutation = TansStackMutation({
    mutationKey: ["DeleteProfileHeader"],
    mutationFn: async (inputValues: { mediaId: string; profileId: string }) => {
      return await GraphQLRequest(DeleteProfileHeader, inputValues);
    },
    onSuccess: async () => {
      toast.success("Successfully Profile Header Deleted");
      queryClient.invalidateQueries({
        queryKey: ["ProfileHeader"],
      });
      setDeleteToggle(false);
    },
  });

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      mediaId: ProfileHeaderData?.header?.mediaID,
      profileId: id,
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      await mutation.mutateAsync({
        mediaId: values.mediaId,
        profileId: values.profileId,
      });
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.container}>
      {deleteToggle ? (
        <Dialog>
          <Prompt
            title="Do you want to delete?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={styles.header}>
              <span>
                Are you sure you want to delete this image? Once you confirm,
                the image will be permanently removed and cannot be recovered.
                Please confirm if you wish to proceed with the deletion.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={onHandleDeleteToggle} name="Cancel" />
              <form onSubmit={handleSubmit}>
                <PrimaryButton
                  loading={isSubmitting ? true : false}
                  name="Confirm"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
          <ToastNotification />
        </Dialog>
      ) : null}

      {isLoading ? (
        <Spinner />
      ) : isEmpty(ProfileHeaderData?.header?.media) ? (
        <div className={styles.fileUpload}>
          {preview ? (
            <div className={styles.preview}>
              <Image src={preview as string} alt="" objectFit="contain" fill />
            </div>
          ) : (
            <Dropzone
              onError={() => {
                toast.error("Invalid File Format");
              }}
              onDrop={(acceptedFiles) => {
                const file = new FileReader();

                file.onload = () => {
                  setPreview(file.result);
                };

                file.readAsDataURL(acceptedFiles[0]);
                setFileUpload(acceptedFiles[0]);
              }}
              accept={{
                "image/*": [],
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
                      Drag and Drop your image, or click to select image
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          )}
        </div>
      ) : (
        <div className={styles.details}>
          <div>
            <Image
              src={ProfileHeaderData?.header?.media}
              alt=""
              fill
              objectFit="contain"
              objectPosition="center"
              priority
              blurDataURL={ProfileHeaderData?.header?.media}
            />
          </div>
          <ButtonIconToggle
            icon={<TbTrash size={23} />}
            value={deleteToggle}
            setValue={setDeleteToggle}
          />
        </div>
      )}

      {fileUpload ? (
        <div className={styles.formContainer}>
          <form onSubmit={onHandleSubmit}>
            {loading ? null : <CancelBtn onClose={removedFileUpload} />}
            <PrimaryButton
              type="submit"
              loading={loading ? true : false}
              name="Submit"
            />
          </form>
        </div>
      ) : null}
      <ToastNotification />
    </div>
  );
}
