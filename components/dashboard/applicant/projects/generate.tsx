"use client";

import React from "react";
import styles from "@/styles/dashboard/job/generateReport.module.scss";
import PropmptStyles from "@/styles/components/prompt.module.scss";
import Prompt from "@/components/prompt";
import { useFormik } from "formik";
import { CSVLink } from "react-csv";

import { CancelBtn, PrimaryButton } from "@/components/button";
import { InputCalendar } from "@/components/input";
import Label from "@/components/label";
import { GenerateReportValidationSchema } from "@/validations/generateReport.validation";
import { useMutation } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import toast from "react-hot-toast";
import ToastNotification from "@/components/notification";
import { RegularPoppins } from "@/components/typograhy";
import { TbX } from "react-icons/tb";
import store from "store2";
import { GenerateProjectOrganizer } from "@/util/Query/project.query";
import { format } from "date-fns";

export default function GenerateReport({ onClose, id }: any) {
  const user = store.get("UserAccount");

  const mutation = useMutation({
    mutationKey: ["GenerateReport"],
    mutationFn: async (inputValues: {
      userId: string;
      startDate: string;
      endDate: string;
    }) => {
      return await GraphQLRequest(GenerateProjectOrganizer, inputValues);
    },
    onSuccess: (data) => {
      toast.success("Successfully Generated Report");
      console.log(data);
    },
  });

  const { errors, touched, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: GenerateReportValidationSchema,
    onSubmit: async (data) => {
      await mutation.mutateAsync({
        userId: user?.id,
        startDate: values.startDate,
        endDate: values.endDate,
      });
    },
  });

  const headers = [
    { label: "Title", key: "Title" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Date Created", key: "createdAt" },
    { label: "Company Name", key: "companyName" },
  ];

  const datas = mutation
    ? mutation.data?.generateProjectOrganizer.map(
        ({
          projectOrganizerID,
          title,
          amount,
          status,
          startDate,
          endDate,
          createdAt,
          company: { companyName },
        }: any) => {
          return {
            title,
            amount,
            status,
            startDate: format(new Date(startDate), "MMMM dd, yyyy hh:mm aa"),
            endDate: format(new Date(endDate), "MMMM dd, yyyy hh:mm aa"),
            createdAt,
            companyName,
          };
        }
      )
    : null;

  const getTotalAmount = mutation.data?.generateProjectOrganizer.reduce(
    (a: any, b: any) => a + b.amount,
    0
  );

  console.log(getTotalAmount);
  return (
    <div className={styles.container}>
      {mutation.data ? (
        <div className={styles.generatedReport}>
          <div className={styles.generatedHeader}>
            <h2 className={RegularPoppins.className}>Generated Report</h2>
            <button onClick={onClose}>
              <TbX size={23} />
            </button>
          </div>
          <div className={styles.generateBody}>
            <table>
              <thead>
                <tr>
                  {headers.map(({ label }) => (
                    <th key={label}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mutation.data.generateProjectOrganizer.map(
                  ({
                    projectOrganizerID,
                    title,
                    amount,
                    startDate,
                    status,
                    endDate,
                    createdAt,
                    company: { companyName },
                  }: any) => (
                    <tr key={projectOrganizerID}>
                      <td>
                        <span>{title}</span>
                      </td>
                      <td>{amount}</td>
                      <td>{status}</td>
                      <td>{format(new Date(startDate), "MMMM dd, yyy")}</td>
                      <td>{format(new Date(endDate), "MMMM dd, yyy")}</td>
                      <td>{format(new Date(createdAt), "MMMM dd, yyy")}</td>
                      <td>{companyName}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.generateFooter}>
            <CSVLink
              headers={headers}
              filename={""}
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "flex-end",
              }}
              data={[
                ...datas,
                { title: "", amount: "" },
                {
                  title: "Total Amount",
                  amount: getTotalAmount,
                },
              ]}
            >
              <button type="submit">
                <span>Download</span>
              </button>
            </CSVLink>
          </div>
        </div>
      ) : (
        <Prompt title="Generate Report">
          <div className={PropmptStyles.body}>
            <Label name="Start Date" required={true} />
            <InputCalendar
              name="startDate"
              errors={errors.startDate}
              touched={touched.startDate}
              onChange={setFieldValue}
              placeholder="Start Date"
              value={values.startDate}
            />
            <Label name="End Date" required={true} />
            <InputCalendar
              name="endDate"
              errors={errors.endDate}
              touched={touched.endDate}
              onChange={setFieldValue}
              placeholder="End Date"
              value={values.endDate}
            />
          </div>
          <div className={PropmptStyles.footer}>
            <CancelBtn onClose={onClose} name="Cancel" />
            <form onSubmit={handleSubmit}>
              <PrimaryButton loading={false} name="Generate" type="submit" />
            </form>
          </div>
        </Prompt>
      )}

      <ToastNotification />
    </div>
  );
}
