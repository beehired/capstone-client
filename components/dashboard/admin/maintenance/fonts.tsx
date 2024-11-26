"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/admin/font.module.scss'
import PromptStyles from '@/styles/components/prompt.module.scss';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';

import Pagination from '@/components/pagination';
import Dialog from '@/components/dialog';

import { CancelBtn, PrimaryButton } from '@/components/button'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { queryClient } from '@/lib/provider'
import store from 'store2'
import Search from '../../search'
import { useDebounce } from '@uidotdev/usehooks'
import Prompt from '@/components/prompt'
import Spinner from '@/components/spinner'
import { useMutation } from '@apollo/client';
import { CreateFontFamily } from '@/util/Mutation/font.mutation';
import { CreateValidatioNFontFamily } from '@/validations/font.validation';
import SpanError from '@/components/Error/spanError';
import FileUploads from '@/components/fileupload';
import { InputV1 } from '@/components/input';
import ToastNotification from '@/components/notification';
import { GetAllFontFamily } from '@/util/Query/font.query';
import FontCard from './fontCard';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import { TbSearch } from 'react-icons/tb';

export default function FontTemplate() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState(false);
    const [fileUpload, setFileUpload] = useState(null)
    const user = store.get("UserAccount");
    const debounceSearch = useDebounce(search, 100);
    const itemsPerPage = 20;


    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const { data, isLoading } = useQuery({
        queryKey: ["GetAllFonts", debounceSearch],
        queryFn: async () => {
            const { getAllFonts } = await GraphQLRequest(GetAllFontFamily, {
                search,
                pagination: {
                    take: itemsPerPage,
                    page: page
                }
            })

            return getAllFonts
        }
    })



    const onHandleClose = () => {
        setToggle(() => !toggle)
    }

    const [mutate] = useMutation(CreateFontFamily)


    const { values, errors, touched, handleSubmit, isSubmitting, handleChange, setFieldValue, resetForm } = useFormik({
        initialValues: {
            userId: user?.id,
            font: "",
            upload: ""
        },
        validationSchema: CreateValidatioNFontFamily,
        onSubmit: (values, { setSubmitting }) => {
            mutate({
                variables: {
                    userId: values.userId,
                    font: values.font,
                    file: fileUpload
                },
                onCompleted: async () => {
                    toast.success("Successfully Added");
                    resetForm()
                    queryClient.invalidateQueries({
                        queryKey: ["GetAllFonts"]
                    })
                }
            })
            setSubmitting(false)
        }
    })
    return (
        <div className={styles.container}>
            {toggle ?
                <Dialog>
                    <Prompt title="Add New">
                        <div className={PromptStyles.body}>
                            <FileUploads name='file' value={values.upload} selectedFile={setFileUpload} setFieldValue={setFieldValue} dragisActive={'Drag and Drop your image, or click to select files'} isNotActive={'Drag and Drop your image, or click to select files'} componentName="none" />
                            {errors.upload && touched.upload ? <SpanError message={errors.upload} /> : null}
                            <InputV1 name='font' errors={errors.font} placeholder='Font name' touched={touched.font} type='text' value={values.font} onChange={handleChange} />
                        </div>
                        <div className={PromptStyles.footer}>
                            {isSubmitting ? null : <CancelBtn onClose={onHandleClose} />}
                            <form onSubmit={handleSubmit}>
                                {isSubmitting ? <Spinner /> : <PrimaryButton name='Submit' loading={isSubmitting ? true : false} type='submit' />}
                            </form>
                        </div>
                    </Prompt>
                    <ToastNotification />
                </Dialog> : null
            }
            <div className={styles.header}>
                <div className={styles.searchContainer}>
                    <TbSearch size={23} />
                    <input type="Search" placeholder='Search here...' onChange={onHandleChange} />
                </div>
                <button onClick={() => setToggle(() => !toggle)}>
                    <span className={RegularPoppins.className}>
                        Add New
                    </span>
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
                    {
                        isEmpty(data?.item) ? <NotAvailable /> : isLoading ? <Spinner /> : data?.item?.map(({ fontID, font, image, createdAt }: { fontID: string, font: string, image: string, createdAt: any }) => (
                            <FontCard key={fontID} fontID={fontID} font={font} image={image} createdAt={createdAt} />
                        ))
                    }
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
                totalPages={data?.totalPages} />
        </div>
    )
}
