"use client"

import React, { ChangeEvent, useState, useRef, KeyboardEvent } from 'react'
import styles from '@/styles/dashboard/applicant/message/message.module.scss'
import { useMutation } from '@apollo/client'
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import store from 'store2';
import Image from 'next/image'
import { isEmpty } from 'lodash';
import DefaulImage from '@/app/public/l60Hf.png'
import { RegularPoppins } from '@/components/typograhy';
import { TbChevronDown, TbChevronUp, TbPhotoScan, TbSend2, TbX } from 'react-icons/tb';
import { GetMessageFreelancerList, GetMessageList, GetPersonalMessage, GetUnreadChat } from '@/util/Query/message.query';
import { GetMyUserProfile } from '@/util/Query/user.query';
import MessageCard from './messageCard';
import MsgCard from '@/components/dashboard/message/card';
import { useFormik } from 'formik';
import { queryClient } from '@/lib/provider';
import { CreateMessage, UpdateMessageStatus } from '@/util/Mutation/message.mutation';
import { Lato } from 'next/font/google';
import toast from 'react-hot-toast';
import { MessageSchema } from '@/validations/message.validation';
import SpanError from '@/components/Error/spanError';

const lato = Lato({
    weight: "400",
    style: "normal",
    display: "auto",
    subsets: ["latin"]
})




export default function Message() {

    const user = store.get("UserAccount");
    const [search, setSearch] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
    const [open, setOpen] = useState(false);
    const [userList, setUser] = useState("")
    const fileRef = useRef<HTMLInputElement | null>(null)
    const maxFileSize = 10 * 1024 * 1024;



    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }



    const UserProfile = ({ id }: any) => {
        return useQuery({
            queryKey: ["ProfileData", id],
            queryFn: async () => {
                const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                    userId: id
                })

                return getProfileByUser
            }
        })
    }

    const { data: ProfileData } = UserProfile({
        id: user?.id
    })

    const { data: UserMessageData } = UserProfile({
        id: userList
    })

    const { data: CountData } = useQuery({
        queryKey: ["GetUnreadChat", user?.id],
        queryFn: async () => {
            const { getUnreadCountMessage } = await GraphQLRequest(GetUnreadChat, {
                userId: user?.id
            })
            return getUnreadCountMessage
        },
        refetchInterval: 1000,
        enabled: !!user?.id
    })

    const { data } = useQuery({
        queryKey: ["MessageList", user?.id, userList, search],
        queryFn: async () => {
            const { getFreelancerMessages } = await GraphQLRequest(GetMessageFreelancerList, {
                userId: user?.id,
                search
            })

            return getFreelancerMessages
        },
        refetchInterval: 1000
    })


    const { data: PersonalMsg } = useQuery({
        queryKey: ["Message", userList],
        queryFn: async () => {
            const { getPersonalMessage } = await GraphQLRequest(GetPersonalMessage, {
                senderId: userList,
                receiverId: user?.id
            })

            return getPersonalMessage
        },
        refetchInterval: 1000
    })


    const onHandleMessagClose = () => {
        setOpen(() => !open)
    }


    const onHandleRemoveFiles = (index: number) => {
        if (selectedFiles) {
            const updateFiles = selectedFiles.filter((_, i) => i !== index)
            setSelectedFiles(updateFiles)
        }
    }






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
                    receiverId: userList,
                    file: selectedFiles
                },
                onCompleted: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["Message", userList]
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["MessageList", user?.id]
                    })
                    resetForm()

                    setSelectedFiles(null)
                }
            })
        }
    })


    const onHandleRemoveUser = () => {
        setUser("")
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

                if (checkFile.size > maxFileSize) {
                    toast.error("File size is exceed 25MB")

                    continue;
                }


                validImageFiles.push(checkFile);
            }

            setFieldValue("file", validImageFiles.length > 0 ? validImageFiles : null);

            setSelectedFiles((prevFiles) => (prevFiles ? [...prevFiles, ...validImageFiles] : validImageFiles));

            e.target.value = ''
        }
    }



    return (
        <div className={styles.container}>
            <div>
                {
                    userList ?
                        <>
                            <div className={styles.currentMessage}>
                                <div onClick={onHandleRemoveUser} className={styles.messageHeader}>
                                    <div className={styles.avatar}>
                                        <Image src={isEmpty(UserMessageData?.user?.getMyCompany?.logo) ? DefaulImage : UserMessageData?.user?.getMyCompany?.logo?.media} alt="" fill objectFit='cover' objectPosition='center' />
                                    </div>
                                    <span className={RegularPoppins.className}>
                                        {UserMessageData?.user?.getMyCompany?.companyName}
                                    </span>
                                </div>
                                <button aria-label="button" onClick={onHandleRemoveUser} className={styles.toggle}>
                                    <TbX size={23} />
                                </button>
                            </div>

                            <div className={styles.messagex}>
                                <div className={styles.body}>
                                    {PersonalMsg?.map(({ messageID, message, messageStatus: { isRead }, createdAt, receivedUser, sendUser, media }: any) => (
                                        <MsgCard key={messageID} messageID={messageID} user={user} sendUser={sendUser} message={message} media={media} date={createdAt} isRead={isRead} />
                                    ))}
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles.fileUpload}>
                                        <input aria-label='file' name="file" type='file' ref={fileRef} hidden multiple accept='image/jpg,image/jpeg, image/png, image/webp, image/avif' onChange={onHandleFileUpload} />
                                        <button name='toggle' className={styles.imageBtn} onClick={handleButtonClick}>
                                            <TbPhotoScan size={23} />
                                        </button>
                                    </div>
                                    <div className={styles.msg}>
                                        {selectedFiles && selectedFiles.length !== 0 ?

                                            <div className={styles.imageArray}>
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className={styles.prevImage}>
                                                        <div className={styles.image}>
                                                            <Image src={URL.createObjectURL(file)} alt="" fill objectFit='cover' objectPosition='center' priority />
                                                        </div>
                                                        <button aria-label="button" onClick={() => onHandleRemoveFiles(index)}>
                                                            <TbX size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            : <textarea className={lato.className} name="message" aria-placeholder='Aa' id="" value={values.message} onKeyDown={handleKeyPress} onChange={handleChange} placeholder='Aa'></textarea>}
                                    </div>

                                    {
                                        values.message || selectedFiles ? <div>
                                            <form onSubmit={handleSubmit}>
                                                <button aria-label='submit' className={styles.submitBtn} type="submit">
                                                    <TbSend2 size={23} />
                                                </button>
                                            </form>
                                        </div> : null
                                    }

                                </div>
                                <div style={{ padding: "0 30px", textAlign: "left" }}>
                                    {errors.message && touched.message ? <SpanError message={errors.message} /> : null}
                                </div>
                            </div>
                        </> : null
                }
            </div>
            <div className={styles.mssc}>
                <div className={styles.message}>
                    <div onClick={onHandleMessagClose} className={styles.messageHeader}>
                        <div className={styles.info}>
                            <div className={styles.avatar}>
                                <Image src={isEmpty(ProfileData?.avatar?.media) ? DefaulImage : ProfileData?.avatar?.media} alt="" objectFit='cover' objectPosition='center' fill />
                            </div>
                            <span className={RegularPoppins.className}>Message</span>
                        </div>
                        {CountData === 0 ? null : <div className={styles.count}>
                            <span className={RegularPoppins.className}>{CountData}</span>
                        </div>}
                    </div>
                    <button aria-label='toggle' onClick={onHandleMessagClose} className={styles.toggle}>
                        {open ? <TbChevronDown size={23} /> : <TbChevronUp size={23} />}
                    </button>
                </div>


                {open ? <>
                    <div className={styles.search}>
                        <input type="text" placeholder='Search message' onChange={onHandleChange} />
                    </div>
                    <div className={styles.messageList}>
                        {data?.map(({ userID, user: { getMyCompany: { companyName, logo }, myProfile: { firstname, lastname, avatar } }, message: { media, message, messageStatus: { messageStatusID, isRead }, sendUser } }: any) => (
                            <MessageCard
                                key={userID}
                                message={message}
                                id={userID}
                                fullname={`${companyName}`}
                                avatar={logo?.media}
                                media={media}
                                read={isRead}
                                readID={messageStatusID}
                                sender={sendUser}
                                setValue={setUser}
                            />
                        ))}
                    </div>
                </>
                    :
                    null}
            </div>

        </div >
    )
}
