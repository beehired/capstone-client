"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from '@/styles/dashboard/message/message.view.module.scss';
import store from 'store2';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetPersonalMessage } from '@/util/Query/message.query';
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { queryClient } from '@/lib/provider';
import { CreateMessage } from '@/util/Mutation/message.mutation';
import { GetMyUserProfile } from '@/util/Query/user.query';
import Image from 'next/image';
import { RegularPoppins } from '@/components/typograhy';
import DefaultImage from '@/app/public/l60Hf.png';
import { isEmpty } from 'lodash';
import { TbPhotoScan, TbX, TbSend2 } from 'react-icons/tb';
import { Lato } from 'next/font/google';
import toast from 'react-hot-toast';
import { MessageSchema } from '@/validations/message.validation';
import SpanError from '@/components/Error/spanError';
import MessageCard from '@/components/dashboard/message/card';
import ToastNotification from '@/components/notification';
import ImageArray from '../../message/imageArray';


const lato = Lato({
    weight: "400",
    style: "normal",
    display: "auto",
    subsets: ["latin"]
})


export default function MessageView() {

    const router = useParams();



    const user = store.get("UserAccount");
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);


    const fileRef = useRef<HTMLInputElement | null>(null)



    const { data } = useQuery({
        queryKey: ["Message", router.id],
        queryFn: async () => {
            const { getPersonalMessage } = await GraphQLRequest(GetPersonalMessage, {
                senderId: user?.id,
                receiverId: router.id
            })

            return getPersonalMessage
        },
        refetchInterval: 1000
    })

    const { data: UserProfile } = useQuery({
        queryKey: ["GetMyProfile", router.id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: router.id
            })

            return getProfileByUser
        }
    })


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
                    receiverId: router.id,
                    file: selectedFiles
                },
                onCompleted: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["Message", router.id]
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["MessageList", user?.id]
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



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Image src={isEmpty(UserProfile?.avatar) ? DefaultImage : UserProfile?.avatar?.media} alt="" fill objectPosition='center' objectFit='cover' priority />
                </div>
                <h2 className={RegularPoppins.className}>{UserProfile?.firstname} {UserProfile?.lastname}</h2>
            </div>
            <div className={styles.body}>
                {data?.map(({ messageID, message, messageStatus: { isRead }, createdAt, receivedUser, sendUser, media }: any) => (
                    <MessageCard key={messageID} user={user} sendUser={sendUser} message={message} media={media} date={createdAt} messageID={messageID} isRead={isRead} />
                ))}
            </div>
            <div className={styles.footer}>
                <div className={styles.fileUpload}>
                    <input type='file' name="file" ref={fileRef} hidden multiple accept='image/jpg,image/jpeg, image/png, image/webp, image/avif' onChange={onHandleFileUpload} />
                    <button className={styles.imageBtn} onClick={handleButtonClick}>
                        <TbPhotoScan size={23} />
                    </button>
                </div>
                <div className={styles.message}>
                    {selectedFiles && selectedFiles.length !== 0 ?

                        <div className={styles.imageArray}>
                            {selectedFiles.map((file, index) => (
                                <ImageArray index={index} key={index} file={file} onHandleRemoveFiles={() => onHandleRemoveFiles(index)} />
                            ))}
                        </div>
                        : <textarea className={lato.className} name="message" aria-placeholder='Aa' id="" value={values.message} onChange={handleChange} placeholder='Aa'></textarea>}
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
            <div style={{ padding: "0 30px", }}>
                {errors.message && touched.message ? <SpanError message={errors.message} /> : null}
            </div>
            <ToastNotification />
        </div>
    )
}
