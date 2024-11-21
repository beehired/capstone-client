"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/admin/font.module.scss'
import PromptStyles from '@/styles/components/prompt.module.scss';

import { RegularPoppins } from '@/components/typograhy';
import { Formatter } from '@/util/formatter';
import { TbAlertCircleFilled, TbEdit, TbTrash } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import Prompt from '@/components/prompt';
import { CancelBtn, DeleteBtn, PrimaryButton } from '@/components/button';
import { useMutation as DeleteMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import ToastNotification from '@/components/notification';
import { queryClient } from '@/lib/provider';
import FileUploads from '@/components/fileupload';
import SpanError from '@/components/Error/spanError';
import { InputV1 } from '@/components/input';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { DeleteFontFamily, UpdateFontFamily } from '@/util/Mutation/font.mutation';
import Image from 'next/image';
import store from 'store2';
import { useMutation } from '@apollo/client';

interface Props {
    fontID: string
    font: string
    image: string
    createdAt: any
}
export default function FontCard({ fontID, font, image, createdAt }: Props) {

    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [fileUpload, setFileUpload] = useState(null)
    const user = store.get("UserAccount")

    const onHandleToggleDeleteBtn = () => {
        setToggleDelete(() => !toggleDelete)
    }

    const oHandleEditToggle = () => {
        setToggleEdit(() => !toggleEdit)
    }


    const [mutate] = useMutation(UpdateFontFamily)

    const mutation = DeleteMutation({
        mutationKey: ["FontDeleted"],
        mutationFn: async (inputValues: { fontId: string, userId: string }) => {
            return await GraphQLRequest(DeleteFontFamily, inputValues)
        },
        onSuccess: (data) => {

            if (data.deleteFontFamily.fontID) {
                toast.success("Successfully Deleted")
                queryClient.invalidateQueries({
                    queryKey: ["GetAllFonts"]
                })
            }
        }
    })


    const { handleSubmit: DeleteSubmission } = useFormik({
        initialValues: {
            fontID: fontID,
            userId: user?.id
        },
        onSubmit: async (values) => {
            await mutation.mutateAsync({
                fontId: values.fontID,
                userId: values.userId
            })
        }
    })

    const { values, errors, touched, handleSubmit, isSubmitting, setFieldValue, handleChange } = useFormik({
        initialValues: {
            fontId: fontID,
            font: font,
            upload: "",
        },
        enableReinitialize: true,
        onSubmit: async () => {
            mutate({
                variables: {
                    fontId: values.fontId,
                    font: values.font,
                    file: fileUpload
                },
                onCompleted: async () => {
                    toast.success("Successfully Updated")
                    queryClient.invalidateQueries({
                        queryKey: ["GetAllFonts"]
                    })
                }
            })
        }
    })

    return (
        <div className={styles.tr}>
            {
                toggleDelete ? <Dialog>
                    <Prompt title='Do you wish to Continue' icon={<TbAlertCircleFilled size={23} />}>
                        <span className={`${PromptStyles.text} ${RegularPoppins.className}`}>Are you sure you want to delete this font? This action is permanent, and any text styled with this font will revert to the default. Please confirm if you wish to proceed with the deletion of this font.</span>
                        <div className={PromptStyles.footer}>
                            <CancelBtn onClose={onHandleToggleDeleteBtn} />
                            <form onSubmit={DeleteSubmission}>
                                <DeleteBtn />
                            </form>
                        </div>
                    </Prompt>
                    <ToastNotification />
                </Dialog> : null
            }
            {
                toggleEdit ? <Dialog>
                    <Prompt title='Edit Theme'>
                        <div className={PromptStyles.body}>
                            <FileUploads name='file' value={values.upload} selectedFile={setFileUpload} setFieldValue={setFieldValue} dragisActive={'Drag and Drop your resume, or click to select files<'} isNotActive={'Drag and Drop your image, or click to select files'} componentName='none' />

                            {errors.upload && touched.upload ? <SpanError message={errors.upload} /> : null}
                            <InputV1 name='font' errors={errors.font} placeholder='Font name' touched={touched.font} type='text' value={values.font} onChange={handleChange} />
                        </div>
                        <div className={PromptStyles.footer}>
                            <CancelBtn onClose={oHandleEditToggle} />
                            <form onSubmit={handleSubmit}>
                                <PrimaryButton name='Submit' loading={isSubmitting ? true : false} type='submit' />
                            </form>
                        </div>
                    </Prompt>
                    <ToastNotification />
                </Dialog>
                    : null
            }
            <div className={styles.td}>
                <div className={styles.image}>
                    <Image src={image} alt="" fill priority />
                </div>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{font}</span>
            </div>
            <div className={styles.td}>
                <span>
                    {Formatter(createdAt)}
                </span>
            </div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <button onClick={oHandleEditToggle} className={styles.edit}>
                        <TbEdit size={20} />
                    </button>
                    <button onClick={onHandleToggleDeleteBtn} className={styles.deleteBtn}>
                        <TbTrash size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
