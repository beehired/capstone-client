"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/avatarModule.module.scss'
import { ButtonIconToggle, PrimaryButton } from '@/components/button'
import { RegularPoppins } from '@/components/typograhy'
import { TbTrash, TbUpload, TbX } from 'react-icons/tb'
import Form from '@/components/form'
import { useFormik } from 'formik'
import Dropzone from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { AddProfileAvatar } from '@/util/Mutation/profile.mutation'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { queryClient } from '@/lib/provider'
import Spinner from '@/components/spinner'
import { CreateAvatarValidation } from '@/validations/avatar.validation'
import SpanError from '@/components/Error/spanError'
import ToastNotification from '@/components/notification'


export default function AvatarModule({ id, value, setValue }: any) {

    const [preview, setPreview] = useState<String | null | ArrayBuffer>()
    const [fileUpload, setFileUpload] = useState<File | null>()


    const [mutate, { loading }] = useMutation(AddProfileAvatar)

    const onHandleRemoveFile = () => {
        setFileUpload(null);
        setPreview(null)
    }

    const { handleSubmit, setFieldValue, values, isSubmitting, errors, touched } = useFormik({
        initialValues: {
            profielId: id,
            upload: ""
        },
        validationSchema: CreateAvatarValidation,
        onSubmit: async ({ upload }, { setSubmitting }) => {
            mutate({
                variables: {
                    profileId: id,
                    file: fileUpload
                },
                onCompleted: async () => {
                    toast.success("Successfully Added Profile Avatar")
                    setValue(() => false)
                    queryClient.invalidateQueries({
                        queryKey: ["UserProfile"]
                    })
                },
            })
            setSubmitting(false)
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}>Avatar</h2>
                    <ButtonIconToggle icon={<TbX size={23} />} setValue={setValue} value={value} />
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.body}>
                        {loading ? <Spinner /> : <div className={styles.fileUpload}>
                            {preview ? (
                                <div className={styles.preview}>
                                    <Image src={preview as string} alt="" fill objectFit='cover' objectPosition='center' priority />
                                </div>
                            ) : <Dropzone
                                onError={() => toast.error("Invalid File Format")}
                                onDrop={acceptedFiles => {

                                    const maxFileSize = 10 * 1024 * 1024;


                                    if (acceptedFiles[0].size > maxFileSize) {
                                        toast.error("File size must not exceed 10MB")
                                        setFileUpload(null);
                                        setFieldValue("upload", null);
                                        return;
                                    }

                                    const file = new FileReader;

                                    file.onload = () => {
                                        setPreview(file.result)
                                    }

                                    file.readAsDataURL(acceptedFiles[0])
                                    setFileUpload(acceptedFiles[0])
                                    setFieldValue("upload", acceptedFiles[0].name)
                                }} accept={{
                                    'image/*': [],

                                }}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className={styles.uploading}>
                                                <TbUpload size={35} />
                                            </div>
                                            <p className={RegularPoppins.className}>Drag and Drop your image, or click to select files (JPEG, PNG, WEB, etc)</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>}
                            {fileUpload ? <div className={styles.trashBtn}>
                                <button type="button" onClick={onHandleRemoveFile}>
                                    <TbTrash size={20} />
                                </button>
                            </div> : null}
                        </div>
                        }
                    </div>
                    {errors.upload && touched.upload ? <SpanError message={errors.upload} /> : null}
                    <div className={styles.footer}>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </div>
                </Form>
            </div >
            <ToastNotification />
        </div >
    )
}
