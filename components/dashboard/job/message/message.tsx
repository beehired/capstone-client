"use client"

import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import styles from '@/styles/dashboard/job/message.module.scss';
import { TbPhotoScan, TbSend2, TbX } from 'react-icons/tb';
import { RegularPoppins } from '@/components/typograhy';
import { useFormik } from 'formik';
import { Lato } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@apollo/client';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetPersonalMessage } from '@/util/Query/message.query';
import store from 'store2';
import { isEmpty } from 'lodash';
import { CreateMessage } from '@/util/Mutation/message.mutation';
import { queryClient } from '@/lib/provider';
import Image from 'next/image';
import { GetMyUserProfile } from '@/util/Query/user.query';
import toast from 'react-hot-toast';
import ToastNotification from '@/components/notification';
import { MessageSchema } from '@/validations/message.validation';

import MessageCard from '@/components/dashboard/message/card';
import SpanError from '@/components/Error/spanError';


const lato = Lato({
    weight: "400",
    style: "normal",
    display: "auto",
    subsets: ["latin"]
})

export default function Message({ close, id }: any) {



    const user = store.get("UserAccount");

    const { data } = useQuery({
        queryKey: ["Message", id],
        queryFn: async () => {
            const { getPersonalMessage } = await GraphQLRequest(GetPersonalMessage, {
                senderId: user?.id,
                receiverId: id
            })

            return getPersonalMessage
        },
        refetchInterval: 1000
    })

    const { data: UserProfile } = useQuery({
        queryKey: ["GetMyProfile", id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: id
            })

            return getProfileByUser
        }
    })

    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)


    const fileRef = useRef<HTMLInputElement | null>(null)



    const [mutate] = useMutation(CreateMessage)
    const { values, handleChange, handleSubmit, resetForm, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            message: "",
            file: null
        },
        validationSchema: MessageSchema,
        onSubmit: async () => {
            await mutate({
                variables: {
                    message: values.message,
                    senderId: user?.id,
                    receiverId: id,
                    file: selectedFiles
                },

                onCompleted: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["Message", id]
                    })

                    setSelectedFiles(null)
                    resetForm()
                }
            })
        }
    })


    const maxFileSize = 10 * 1024 * 1024;

    const onHandleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files;
            const files = Array.from(file);
            const validImageFiles: File[] = [];

            for (let checkFile of files) {
                if (!checkFile.type.startsWith("image/")) {
                    toast.error("Invalid Format");
                    continue;
                }

                if (checkFile.size >= maxFileSize) {
                    toast.error("File size is exceed 10MB")
                    continue;
                }

                validImageFiles.push(checkFile);
            }

            setFieldValue("file", validImageFiles.length > 0 ? validImageFiles : null);

            setSelectedFiles((prevFiles) => (prevFiles ? [...prevFiles, ...validImageFiles] : validImageFiles));

            e.target.value = ''
        }
    }


    const onHandleRemoveFiles = (index: number) => {
        if (selectedFiles) {
            const updateFiles = selectedFiles.filter((_, i) => i !== index)
            setSelectedFiles(updateFiles)
        }
    }

    const handleButtonClick = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }



    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <div className={styles.header}>
                    <h2 className={styles.name}>{UserProfile?.firstname} {UserProfile?.lastname}</h2>
                    <button onClick={close}>
                        <TbX size={23} />
                    </button>
                </div>
                <div className={styles.body}>
                    {data?.map(({ messageID, message, messageStatus: { isRead }, createdAt, receivedUser, sendUser, media }: any) => (
                        <MessageCard key={messageID} messageID={messageID} user={user} sendUser={sendUser} message={message} media={media} date={createdAt} isRead={isRead} />
                    ))}
                </div>
                <div className={styles.footer}>
                    <div className={styles.fileUpload}>
                        <input type='file' ref={fileRef} hidden multiple accept='image/jpg,image/jpeg, image/png, image/webp, image/avif'
                            onChange={onHandleFileUpload}
                        />
                        <button className={styles.imageBtn} onClick={handleButtonClick}>
                            <TbPhotoScan size={23} />
                        </button>
                    </div>
                    <div className={styles.message}>
                        {selectedFiles && selectedFiles.length !== 0 ?

                            <div className={styles.imageArray}>
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className={styles.prevImage}>
                                        <div className={styles.image}>
                                            <Image src={URL.createObjectURL(file)} alt="" fill objectFit='cover' objectPosition='center' priority />
                                        </div>
                                        <button onClick={() => onHandleRemoveFiles(index)}>
                                            <TbX size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            : <textarea className={lato.className} name="message" aria-placeholder='Aa' id="" value={values.message} onChange={handleChange} placeholder='Aa' onKeyDown={handleKeyPress} rows={4}></textarea>}
                    </div>

                    {
                        values.message || selectedFiles ? <div>
                            <form onSubmit={handleSubmit}>
                                <button className={styles.submitBtn} type="submit">
                                    <TbSend2 size={23} />
                                </button>
                            </form>
                        </div> : null
                    }

                </div>
                {errors.message && touched.message ?
                    <div style={{ padding: " 30px", }}>
                        <SpanError message={errors.message} />
                    </div> : null}
            </div>

            <ToastNotification />
        </div >
    )
}
