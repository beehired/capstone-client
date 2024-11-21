"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/dashboard/message/card.module.scss';
import { isEmpty } from 'lodash';
import Image from 'next/image'
import { format } from 'date-fns';
import ImageViewer from '@/components/imageViewer';
import { TbTrash } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import Prompt from '@/components/prompt';
import { CancelBtn, PrimaryButton } from '@/components/button';
import { useFormik } from 'formik';
import PromptStyles from '@/styles/components/prompt.module.scss'
import ToastNotification from '@/components/notification';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { DeleteMessage } from '@/util/Mutation/message.mutation';
import toast from 'react-hot-toast';
import { queryClient } from '@/lib/provider';

export default function MessageCard({ sendUser, user, message, media, date, messageID }: any) {

    const [deleteToggle, setDeleteToggle] = useState(false);

    const [imageViewer, setImageViewer] = useState(false);
    const messageRef = useRef<HTMLDivElement | null>(null)
    const onHandleImageTogle = () => {
        setImageViewer(() => !imageViewer)
    }

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }
    useEffect(() => {
        scrollToBottom()
    }, [])

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    const mutation = useMutation({
        mutationKey: ["DeleteMessage"],
        mutationFn: async (inputValues: { messageId: string }) => {
            return await GraphQLRequest(DeleteMessage, inputValues)
        },
        onSuccess(data, variables, context) {
            toast.success("Successfully Message Deleted")
        },
    })

    const { handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            messageId: messageID
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            await mutation.mutateAsync({
                messageId: values.messageId
            })
            queryClient.invalidateQueries({
                queryKey: ["Message"]
            })
        }
    })
    return (
        <div>
            {
                deleteToggle && <Dialog>
                    <Prompt title="Do you want to delete this message?">
                        <div className={PromptStyles.header}>
                            <span> Are you sure you want to delete this message? This action cannot be undone. Please confirm your decision to proceed with the deletion.</span>
                        </div>
                        <div className={PromptStyles.footer}>
                            {isSubmitting ? null : <CancelBtn onClose={onHandleDeleteToggle} />}
                            <form onSubmit={handleSubmit}>
                                <PrimaryButton name='Confirm' loading={isSubmitting ? true : false} type='submit' />
                            </form>
                        </div>
                    </Prompt>
                    <ToastNotification />
                </Dialog>
            }
            {
                sendUser.userID === user?.id ?

                    <div className={styles.senderCard}>
                        {
                            imageViewer && <ImageViewer image={media.media} close={onHandleImageTogle} />
                        }
                        <button onClick={onHandleDeleteToggle} className={styles.btnTrash}>
                            <TbTrash size={18} />
                        </button>

                        {isEmpty(media) ?
                            <div className={styles.smContainer}>

                                <div className={styles.senderContainer}>
                                    <span className={styles.message}>{message}</span>
                                </div>
                                <div className={styles.dateContainer}>
                                    <span className={styles.date}>{format(new Date(date), "MMM dd hh:mm aa")}</span>
                                </div>
                            </div> :
                            <div onClick={onHandleImageTogle} className={styles.imageContainer}>
                                <div className={styles.imagePreview}>
                                    <Image src={media?.media} alt="" fill objectFit='cover' objectPosition='center' priority />
                                </div>
                                <div className={styles.dateContainer}>
                                    <span className={styles.date}>{format(new Date(date), "MMM dd hh:mm aa")}</span>
                                </div>
                            </div>
                        }
                    </div> :
                    <div className={styles.receiverCard}>
                        {
                            imageViewer && <ImageViewer image={media.media} close={onHandleImageTogle} />
                        }
                        {isEmpty(media) ?
                            <div className={styles.rmContainer}>
                                <div className={styles.receiverContainer}>
                                    <span className={styles.message}>{message}</span>
                                </div>
                                <div className={styles.dateContainer}>
                                    <span className={styles.date}>{format(new Date(date), "MMM dd hh:mm aa")}</span>
                                </div>
                            </div> :
                            <div onClick={onHandleImageTogle} className={styles.imageContainer}>
                                <div className={styles.imagePreview}>
                                    <Image src={media?.media} alt="" fill objectFit='cover' objectPosition='center' priority />
                                </div>
                                <div className={styles.dateContainer}>
                                    <span className={styles.date}>{format(new Date(date), "MMM dd hh:mm aa")}</span>
                                </div>
                            </div>
                        }
                    </div>
            }
            <div ref={messageRef} />
        </div>
    )
}
