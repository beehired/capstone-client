"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/dashboard/admin/theme.module.scss";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { MediumPoppins, RegularPoppins } from "@/components/typograhy";
import { useQuery } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";

import Pagination from "@/components/pagination";
import Dialog from "@/components/dialog";

import { CancelBtn, PrimaryButton } from "@/components/button";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { queryClient } from "@/lib/provider";

import Search from "../../search";
import { useDebounce } from "@uidotdev/usehooks";
import Prompt from "@/components/prompt";
import Spinner from "@/components/spinner";
import { GetAllProfileTheme } from "@/util/Query/theme.query";
import { useMutation } from "@apollo/client";
import { CreateProfileTheme } from "@/util/Mutation/theme.mutation";
import store from "store2";
import ThemeCard from "./themeCard";
import FileUploads from "@/components/fileupload";
import { InputV1 } from "@/components/input";
import { CreateValidationProfileTheme } from "@/validations/theme.validation";
import SpanError from "@/components/Error/spanError";
import ToastNotification from "@/components/notification";
import { isEmpty } from "lodash";
import NotAvailable from "@/components/notavailable";
import { TbSearch } from "react-icons/tb";

export default function ThemeTemplate() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const [fileUpload, setFileUpload] = useState(null);
  const user = store.get("UserAccount");
  const debounceSearch = useDebounce(search, 100);
  const itemsPerPage = 20;

  const NextPage = () => {
    setPage(() => page + 1);
  };

  const PrevPage = () => {
    setPage(() => page - 1);
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["GetAllThemes", debounceSearch, page],
    queryFn: async () => {
      const { getThemes } = await GraphQLRequest(GetAllProfileTheme, {
        search,
        pagination: {
          take: itemsPerPage,
          page: page,
        },
      });

      return getThemes;
    },
  });

  const onHandleClose = () => {
    setToggle(() => !toggle);
  };

  const [mutate] = useMutation(CreateProfileTheme);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      userId: user?.id,
      theme: "",
      upload: "",
    },
    validationSchema: CreateValidationProfileTheme,
    onSubmit: async (values, { setSubmitting }) => {
      mutate({
        variables: {
          userId: values.userId,
          theme: values.theme,
          file: fileUpload,
        },
        onCompleted: async () => {
          toast.success("Successfully Added");
          queryClient.invalidateQueries({
            queryKey: ["GetAllThemes"],
          });
          resetForm();
        },
      });
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.container}>
      {toggle ? (
        <Dialog>
          <Prompt title="Add New">
            <div className={PromptStyles.body}>
              <FileUploads
                name="file"
                value={values.upload}
                selectedFile={setFileUpload}
                setFieldValue={setFieldValue}
                dragisActive={
                  "Drag and Drop your resume, or click to select files<"
                }
                isNotActive={
                  "Drag and Drop your image, or click to select files (JPEG, AVIF, PNG, JPG only)"
                }
                componentName="none"
              />
              {errors.upload && touched.upload ? (
                <SpanError message={errors.upload} />
              ) : null}
              <InputV1
                name="theme"
                errors={errors.theme}
                placeholder="Theme name"
                touched={touched.theme}
                type="text"
                value={values.theme}
                onChange={handleChange}
              />
            </div>
            <div className={PromptStyles.footer}>
              {isSubmitting ? null : (
                <CancelBtn onClose={onHandleClose} name="Cancel" />
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
          <ToastNotification />
        </Dialog>
      ) : null}
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <TbSearch size={23} />
          <input
            type="Search"
            placeholder="Search here..."
            onChange={onHandleChange}
            aria-label="search"
          />
        </div>
        <button aria-label="button" onClick={() => setToggle(() => !toggle)}>
          <span className={RegularPoppins.className}>Add New</span>
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.thead}>
          <div className={styles.tr}>
            <div className={styles.th}>
              <span className={MediumPoppins.className}>Image</span>
            </div>
            <div className={styles.th}>
              <span className={MediumPoppins.className}>Name</span>
            </div>
            <div className={styles.th}>
              <span className={MediumPoppins.className}>Date Created</span>
            </div>
            <div className={styles.th}>
              <span className={MediumPoppins.className}>Actions</span>
            </div>
          </div>
        </div>
        <div className={styles.tbody}>
          {isLoading ? (
            <Spinner />
          ) : isEmpty(data?.item) ? (
            <NotAvailable />
          ) : (
            data?.item?.map(
              ({
                themeID,
                theme,
                image,
                createdAt,
              }: {
                themeID: string;
                theme: string;
                image: string;
                createdAt: any;
              }) => (
                <ThemeCard
                  key={themeID}
                  themeID={themeID}
                  theme={theme}
                  image={image}
                  createdAt={createdAt}
                />
              )
            )
          )}
        </div>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        nextButton={NextPage}
        prevButton={PrevPage}
        currentPage={data?.currentPage}
        hasNextPage={data?.hasNextPage}
        hasPrevPage={data?.hasPrevPage}
        totalItems={data?.totalItems}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
