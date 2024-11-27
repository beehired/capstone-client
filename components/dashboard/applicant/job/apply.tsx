import React from "react";
import styles from "@/styles/dashboard/applicant/job/apply.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetMyResumeList } from "@/util/Query/resume";
import { GetMyUserProfile } from "@/util/Query/user.query";
import store from "store2";
import { TbX } from "react-icons/tb";
import Spinner from "@/components/spinner";
import InputRadio from "@/components/radio";
import { MediumPoppins } from "@/components/typograhy";
import { useFormik } from "formik";
import { CreateApplication } from "@/util/Mutation/application.mutation";
import { ApplicationTypes } from "@/types/application";
import { toast } from "react-hot-toast";
import { CancelBtn, PrimaryButton } from "@/components/button";
import ToastNotification from "@/components/notification";
import { isEmpty } from "lodash";
import NotAvailable from "@/components/notavailable";

export default function ApplyNow({ close, jobPostId }: any) {
  const user = store.get("UserAccount");

  const { data: ProfileData } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: async () => {
      const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
        userId: user?.id,
      });

      return getProfileByUser;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["GetMyResumes"],
    queryFn: async () => {
      const { getAllResumyByProfileID } = await GraphQLRequest(
        GetMyResumeList,
        {
          profileId: ProfileData.profileID,
        }
      );

      return getAllResumyByProfileID;
    },
  });

  const mutation = useMutation({
    mutationKey: ["ApplyNow"],
    mutationFn: async (inputValues: ApplicationTypes) => {
      return await GraphQLRequest(CreateApplication, inputValues);
    },
    onSuccess(data, variables, context) {
      if (data.createApplication.applicationID) {
        toast.success("Successfully Sent Application");
        close();
      }
      if (data.createApplication.code) {
        toast.error(data.createApplication.message);
      }
    },
  });

  const { handleSubmit, handleChange, isSubmitting } = useFormik({
    initialValues: {
      resumeId: "",
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync({
        userId: user.id,
        jobPostId: jobPostId,
        resumeId: values.resumeId,
      });
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.applicationContainer}>
        <div className={styles.header}>
          <h2>Select Your Resume</h2>
          <button onClick={close}>
            <TbX size={23} />
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {isEmpty(data) ? (
              <NotAvailable />
            ) : (
              data.map(
                ({ resumeID, title }: { resumeID: string; title: string }) => (
                  <div className={styles.resumeCard} key={resumeID}>
                    <div>
                      <h3 className={MediumPoppins.className}>{title}</h3>
                    </div>

                    <InputRadio
                      name="resumeId"
                      onChange={handleChange}
                      value={resumeID}
                    />
                  </div>
                )
              )
            )}
          </>
        )}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {isSubmitting ? null : <CancelBtn onClose={close} name="Cancel" />}
            <PrimaryButton
              name="Submit"
              loading={isSubmitting ? true : false}
              type="submit"
            />
          </form>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
}
