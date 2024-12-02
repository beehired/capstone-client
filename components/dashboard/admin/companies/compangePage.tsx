"use client";

import { GraphQLRequest } from "@/lib/graphQLRequest";
import { CompanySlug } from "@/util/Query/company";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "@/styles/dashboard/admin/companies.slug.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import { RegularPoppins } from "@/components/typograhy";
import { companyTab } from "@/util";
import CompanyJobPost from "./companyPost";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import ToastNotification from "@/components/notification";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { useFormik } from "formik";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { UpdateCompanyStatus } from "@/util/Mutation/company.mutation";
import toast from "react-hot-toast";
import CompanyDocu from "./companyDocu";

export default function CompanyPage({ id }: any) {
  const [tab, setTab] = useState("Documents");
  const [editStatus, setEditStatus] = useState(false);
  const { data } = useQuery({
    queryKey: ["GetCompanyPage", id],
    queryFn: async () => {
      const { getCompanySlug } = await GraphQLRequest(CompanySlug, {
        slug: id,
      });
      return getCompanySlug;
    },
  });

  const onHandleEditToggle = () => {
    setEditStatus(() => !editStatus);
  };

  const mutation = useMutation({
    mutationKey: ["UpdateCompanyStatus"],
    mutationFn: async (inputValues: { companyId: string }) => {
      return await GraphQLRequest(UpdateCompanyStatus, inputValues);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Successfully Updated");
      }
    },
  });

  const { isSubmitting, handleSubmit, values } = useFormik({
    initialValues: {
      compnayId: data?.companyID,
    },
    validationSchema: "",
    enableReinitialize: true,
    onSubmit: async () => {
      await mutation.mutateAsync({
        companyId: values.compnayId,
      });
    },
  });

  return (
    <div className={styles.container}>
      {editStatus ? (
        <Dialog>
          <Prompt title="Verify Company Status">
            <div className={PromptStyles.header}>
              <span>
                Do you want to update this company to verify? Once you confirm
                this company, this action cannot be undone. Verified companies
                gain trust and credibility on our platform, and the verification
                status cannot be reverted to unverified. Please confirm that all
                company details are accurate and up-to-date before proceeding.
                If you’re ready to make this change, click ‘Confirm.’ Otherwise,
                click ‘Cancel’ to go back.
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
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <Image src={data?.logo?.media} alt="" height={80} width={80} />
            <div>
              <h2>{data?.companyName}</h2>
              <span>{data?.location}</span>
            </div>
          </div>
          {data?.verified ? null : (
            <div className={styles.editBtn}>
              <button onClick={onHandleEditToggle}>
                <span className={RegularPoppins.className}>Edit Status</span>
              </button>
            </div>
          )}
        </div>
        <p>{data?.description}</p>
      </div>
      <div className={styles.tab}>
        {companyTab.map(({ name, value }) => (
          <button
            key={name}
            onClick={(e) => {
              setTab(e.currentTarget.value);
            }}
            value={value}
            aria-label={name}
            className={value === tab ? `${styles.active}` : ""}
          >
            <span className={RegularPoppins.className}>{name}</span>
          </button>
        ))}
      </div>
      <div className={styles.tabView}>
        {tab === "Post" ? <CompanyJobPost data={data?.jobPost} /> : null}
        {tab === "Documents" ? <CompanyDocu data={data?.requirements} /> : null}
      </div>
    </div>
  );
}
