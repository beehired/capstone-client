"use client"
import React, { SyntheticEvent, useState } from 'react'
import { GetCompany } from '@/util/Query/company'
import PromptStyles from '@/styles/components/prompt.module.scss'
import store from 'store2'
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import styles from '@/styles/dashboard/settings/company.module.scss'
import Image from 'next/image'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';
import { TbEye, TbPdf, TbPlus, TbTrash, TbUpload } from 'react-icons/tb';
import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { CompanyDocumentRequirement, UpdateCompanyLogo } from '@/util/Mutation/company.mutation';
import { queryClient } from '@/lib/provider';
import { CancelBtn, PrimaryButton } from '@/components/button';
import { format } from 'date-fns'
import NotAvailable from '@/components/notavailable';
import Dialog from '@/components/dialog';
import Prompt from '@/components/prompt';
import FileUploads from '@/components/fileupload'
import SpanError from '@/components/Error/spanError'
import { useFormik } from 'formik'

export default function Company() {


    const user = store.get("UserAccount");
    const [toggle, setToggle] = useState(false);
    const [fileUpload, setFileUpload] = useState<File | null>();
    const [imageUpload, setImageUpload] = useState<File | null>();
    const [docs, setDocs] = useState(false);

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }

    const onHandleDocs = () => {
        setDocs(() => !docs)
    }

    const { data } = useQuery({
        queryKey: ["GetMyCompany", user?.id],
        queryFn: async () => {
            const { getMyCompanyByUserID } = await GraphQLRequest(GetCompany, {
                userId: user?.id
            })

            return getMyCompanyByUserID
        }
    })

    const [mutate, { loading }] = useMutation(CompanyDocumentRequirement, {
        variables: {
            companyId: user?.user?.company.companyID,
            file: fileUpload
        },
        onCompleted: () => {
            toast.success("Successfully Upload")
            setFileUpload(null)
            queryClient.invalidateQueries({
                queryKey: ["GetMyCompany"]
            })
        }
    })


    const [companyLogo, { loading: CompanyLogoLoading }] = useMutation(UpdateCompanyLogo)


    const onHandleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()
    }


    const removedFileUpload = () => {
        setFileUpload(null)
    }


    const { values, handleSubmit, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            upload: "",
        },
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            await companyLogo({
                variables: {
                    companyId: user?.user?.company.companyID,
                    file: imageUpload
                },
                onCompleted: () => {
                    toast.success("Successfully Upload")
                    setImageUpload(null)
                    queryClient.invalidateQueries({
                        queryKey: ["GetMyCompany"]
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["Company"]
                    })
                }
            })
            setSubmitting(false);
        }
    })

    return (
        <div className={styles.container}>
            {
                docs ? <Dialog>
                    <div className={styles.docs}>
                        <Prompt title="Upload Company Documents">
                            <div className={PromptStyles.header}>
                                {
                                    fileUpload ?
                                        <div className={styles.file}>
                                            <div className={styles.pdf}>
                                                <TbPdf size={35} />
                                            </div>
                                            <div className={styles.details}>
                                                <span className={RegularPoppins.className}>{fileUpload.name}</span>
                                                <span className={RegularPoppins.className}>{format(new Date(fileUpload.lastModified), "MMMM dd, yyyy")}</span>
                                            </div>
                                            <div className={styles.deleteBtn}>
                                                <button onClick={removedFileUpload}>
                                                    <TbTrash size={23} />
                                                </button>
                                            </div>
                                        </div> :
                                        <div className={styles.fileUpload}>
                                            <Dropzone
                                                onDropRejected={(err) => {
                                                    console.log('Error:', err);
                                                    toast.error("Invalid File Format");
                                                }}
                                                onDrop={acceptedFiles => setFileUpload(acceptedFiles[0])}
                                                accept={{
                                                    "application/pdf": [".pdf"]
                                                }}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <div className={styles.uploading}>
                                                                <TbUpload size={45} />
                                                            </div>
                                                            <p className={RegularPoppins.className}>Drag and Drop your documents, or click to select files</p>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </div>
                                }

                            </div>
                            <div className={PromptStyles.footer}>
                                <CancelBtn onClose={onHandleDocs} />
                                {fileUpload ? <form onSubmit={onHandleSubmit}>
                                    <PrimaryButton loading={loading ? true : false} name='Submit' type='submit' />
                                </form> : null}
                            </div>
                        </Prompt>
                    </div>
                </Dialog> : null
            }
            {
                toggle ? <Dialog>
                    <div className={styles.docs}>
                        <Prompt title='Update Company Logo'>
                            <div className={PromptStyles.header}>
                                <FileUploads setFieldValue={setFieldValue} value={values.upload} selectedFile={setImageUpload} dragisActive={'Drop your Company Logo'}
                                    isNotActive={'Drop your Company Logo'} requiredWidth={500} requiredHeight={500} componentName={'company'} />

                            </div>
                            <div className={PromptStyles.footer}>
                                {isSubmitting ? null : <CancelBtn onClose={onHandleToggle} />}
                                {values.upload ? <form onSubmit={handleSubmit}>
                                    <PrimaryButton loading={CompanyLogoLoading ? true : false} name='Submit' type='submit' />
                                </form> : null}
                            </div>
                        </Prompt>
                    </div>
                </Dialog> : null
            }
            <div className={styles.avatar}>
                <div className={styles.avatarPic}>
                    <Image src={data?.logo.media} alt="" fill objectFit='cover' objectPosition='center' />
                </div>
                <div>
                    <button onClick={onHandleToggle}>
                        <span className={RegularPoppins.className}>Change Company Picture</span>
                    </button>
                </div>
            </div>


            <div className={styles.documents}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}>Documents</h2>
                    <button onClick={onHandleDocs}>
                        <TbPlus size={23} />
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.thead}>
                        <div className={styles.tr}>
                            <div className={styles.th}>
                                <span className={MediumPoppins.className}>Filename</span>
                            </div>
                            <div className={styles.th}>
                                <span className={MediumPoppins.className}>Date Created</span>
                            </div>
                            <div className={styles.th}>
                                <span className={MediumPoppins.className}>Action</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tbody}>
                        {data?.requirements.map(({ requirementsID, type, requirement, createdAt }: any) => (
                            <div className={styles.tr} key={requirementsID}>
                                <div className={styles.td}>
                                    <span>{type.length <= 30 ? type : `${type.slice(0, 30)}...`}</span>
                                </div>
                                <div className={styles.td}>
                                    <span>{format(new Date(createdAt), "MMMM dd,  yyyy")}</span>
                                </div>
                                <div className={styles.td}>
                                    <a target="_blank" href={requirement}>
                                        <TbEye size={23} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
