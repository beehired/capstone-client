"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard/applicant/profile/module/work.card.module.scss";
import { RegularPoppins } from "@/components/typograhy";
import {
  ButtonIconToggle,
  CancelBtn,
  PrimaryButton,
} from "@/components/button";
import {
  TbAlertCircle,
  TbAlertCircleFilled,
  TbEdit,
  TbTrash,
} from "react-icons/tb";
import Dialog from "@/components/dialog";
import EditWork from "./workEdit";
import Prompt from "@/components/prompt";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { DeleteMyPortfolio } from "@/util/Mutation/portoflio.mutation";
import toast from "react-hot-toast";
import ToastNotification from "@/components/notification";
import { queryClient } from "@/lib/provider";

interface Props {
  portfolioID: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  employmentType: string;
  locationType: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  skills: any;
  createdAt: any;
}

export default function WorkCard({
  title,
  description,
  companyName,
  location,
  startMonth,
  createdAt,
  endMonth,
  endYear,
  employmentType,
  locationType,
  startYear,
  portfolioID,
  skills,
}: Props) {
  const [editToggle, setEditToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const mutation = useMutation({
    mutationKey: ["WorkExperienceDelete", portfolioID],
    mutationFn: async (inputValues: { portfolioId: string }) => {
      return await GraphQLRequest(DeleteMyPortfolio, inputValues);
    },
    onSuccess: (data) => {
      toast.success("Succesfully Deleted");
      setDeleteToggle(false);
      queryClient.invalidateQueries({
        queryKey: ["WorkExperience"],
      });
    },
  });

  const onhHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
  };

  const { values, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      portfolioID: portfolioID,
    },
    onSubmit: async (data) => {
      await mutation.mutateAsync({
        portfolioId: values.portfolioID,
      });
    },
  });
  return (
    <div className={styles.container}>
      {editToggle ? (
        <Dialog>
          <EditWork
            portfolioID={portfolioID}
            title={title}
            description={description}
            companyName={companyName}
            location={location}
            startMonth={startMonth}
            endMonth={endMonth}
            endYear={endYear}
            employmentType={employmentType}
            startYear={startYear}
            locationTe={locationType}
            value={editToggle}
            setValue={setEditToggle}
            skills={skills}
          />
        </Dialog>
      ) : null}
      {deleteToggle ? (
        <Dialog>
          <Prompt
            title="Do you want to delete?"
            icon={<TbAlertCircleFilled size={23} />}
          >
            <div className={PromptStyles.header}>
              <span>
                Are you sure you want to delete this work experience from your
                profile? Once removed, all associated details will be
                permanently deleted and cannot be recovered. Please confirm if
                you{"'"}d like to proceed with this action.
              </span>
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onhHandleDeleteToggle} name="Cancel" />
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
      <div>
        <div className={styles.header}>
          <h2 className={`${RegularPoppins.className} ${styles.title}`}>
            {title}
          </h2>
          <div className={styles.btnGrp}>
            <ButtonIconToggle
              icon={<TbEdit size={23} />}
              value={editToggle}
              setValue={setEditToggle}
            />
            <ButtonIconToggle
              icon={<TbTrash size={23} />}
              value={deleteToggle}
              setValue={setDeleteToggle}
            />
          </div>
        </div>
        <div>
          <span className={RegularPoppins.className}>
            {companyName} &#x2022; {locationType}
          </span>
        </div>
        <div className={styles.date}>
          <span className={RegularPoppins.className}>
            {startMonth} {startYear} -{" "}
            {endMonth === null && endYear === null
              ? "Present"
              : `${endMonth} ${endYear}`}
          </span>
        </div>
        <div className={styles.date}>
          <span className={RegularPoppins.className}>
            {location} - {employmentType}
          </span>
        </div>
        <p>{description}</p>

        <div className={styles.skills}>
          {skills.slice(0, 5).map(({ skills }: { skills: any }) => (
            <div key={skills}>
              <span className={RegularPoppins.className} key={skills}>
                {skills}
              </span>
            </div>
          ))}{" "}
          {skills.length > 5
            ? `${skills.slice(5, skills.length).length}+ more`
            : null}
        </div>
      </div>
    </div>
  );
}
