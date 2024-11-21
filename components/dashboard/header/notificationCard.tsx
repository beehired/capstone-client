"use client"

import React, { useState } from 'react'
import styles from '@/styles/components/notificationCard.module.scss'
import { RegularPoppins } from '@/components/typograhy'
import { format, formatDistanceToNow } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { UpdateNotification, ArchiveNotification } from '@/util/Mutation/notification.mutation'
import { queryClient } from '@/lib/provider'
import Dialog from '@/components/dialog'
import { TbTrash, TbX } from 'react-icons/tb'
import Image from 'next/legacy/image'
import Prompt from '@/components/prompt'
import PromptStyles from '@/styles/components/prompt.module.scss'
import { useFormik } from 'formik'
import { CancelBtn, PrimaryButton } from '@/components/button'
import BeeHiredLogo from '@/app/public/beehired.png'



export default function NotificationCard({ title, notificationID, status, date,
    application, company, schedule }: any) {


    const [archive, setArchive] = useState(false)
    const [toggleNotification, setToggleNotification] = useState(false)

    const mutation = useMutation({
        mutationKey: ["UpdateNotificaion", notificationID],
        mutationFn: async (inputValues: { notificationId: string }) => {
            return await GraphQLRequest(UpdateNotification, inputValues)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification"]
            })
        }
    })


    const onHandleArchiveToggle = () => {
        setArchive(() => !archive)
    }


    const mutationNotificaion = useMutation({
        mutationKey: ["ArchiveNotification", notificationID],
        mutationFn: async (inputValues: { notificationId: string }) => {
            return await GraphQLRequest(ArchiveNotification, inputValues)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification"]
            })
        }
    })


    const { handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            notificationId: notificationID
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            await mutationNotificaion.mutateAsync({
                notificationId: values.notificationId
            })
        }
    })
    return (
        <div className={`${styles.container} ${status ? styles.read : styles.unread}`}>
            {
                toggleNotification ?
                    <Dialog>
                        <div className={styles.dialog}>
                            <div className={styles.dialogContainer}>
                                <div className={styles.diaglogHeader}>
                                    <div>
                                        <button onClick={onHandleArchiveToggle}>
                                            <TbTrash size={23} />
                                        </button>
                                    </div>
                                    <button onClick={() => setToggleNotification(() => !toggleNotification)}>
                                        <TbX size={23} />
                                    </button>
                                </div>
                                <div className={styles.companyHeader}>
                                    {application?.jobPost ?

                                        <div className={styles.companyInfo}>
                                            {title.includes("Submitted") || title.includes("Congratulation") || title.includes("Review") || title.includes("Declined") ? <>
                                                <Image src={application?.company?.logo?.media} alt="" width={120} height={120} />
                                                <span>
                                                    <h2 className={RegularPoppins.className}>{application?.company?.companyName}</h2>
                                                </span>
                                            </> : null}

                                            {
                                                title.includes("Created") ?
                                                    <>
                                                        <Image src={company?.logo?.media} alt="" width={120} height={120} />
                                                        <span>
                                                            <h2 className={RegularPoppins.className}>{company?.companyName}</h2>
                                                        </span>
                                                    </> : null
                                            }

                                            {title.includes("Reschedule") ?
                                                <>
                                                    <Image src={company?.logo?.media} alt="" width={120} height={120} />
                                                    <span>
                                                        <h2 className={RegularPoppins.className}>{company?.companyName}</h2>
                                                    </span>
                                                </> : null}

                                        </div> : <>
                                            <Image src={BeeHiredLogo} alt="" width={120} height={120} />

                                        </>}



                                </div>
                                {application?.jobPost ?
                                    <>
                                        {
                                            title.includes("Submitted") || title.includes("Congratulation") || title.includes("Review") || title.includes("Declined") ?
                                                <div className={styles.applicationScore}>
                                                    <h2 className={RegularPoppins.className}>Your Application ID is {application?.id}</h2>
                                                    <span className={RegularPoppins.className}>Your application has a score of {application?.score?.score}%</span >
                                                </div> : null
                                        }
                                        {title.includes("Reschedule") ?
                                            <div className={styles.applicationScore}>
                                                <span>Start Date: {format(new Date(schedule?.startDate), "MMMM dd, yyyy")} - {schedule.startTime}</span>
                                                <span>End  Date: {format(new Date(schedule?.endDate), "MMMM dd, yyyy")} - {schedule?.endTime}</span>
                                            </div> :
                                            null}
                                        {title.includes("Created") ?
                                            <div className={styles.applicationScore}>
                                                <span>Start Date: {format(new Date(schedule?.startDate), "MMMM dd, yyyy")} - {schedule.startTime}</span>
                                                <span>End  Date: {format(new Date(schedule?.endDate), "MMMM dd, yyyy")} - {schedule?.endTime}</span>
                                            </div> :
                                            null
                                        }
                                    </>

                                    : <span className={RegularPoppins.className}> This job post has been deleted and is no longer available. For further information or assistance, please contact our support team.</span>
                                }
                            </div>
                        </div>
                    </Dialog> :
                    null
            }
            {
                archive ?
                    <Dialog>
                        <Prompt title='Do you want to delete this notification?'>
                            <div className={PromptStyles.header}>
                                <span>Are you sure you want to delete this notification? Once deleted, it cannot be recovered, and you will lose all associated information. Please confirm if you wish to proceed with the deletion.
                                </span>
                            </div>
                            <div className={PromptStyles.footer}>
                                {isSubmitting ? null : <CancelBtn onClose={onHandleArchiveToggle} />}
                                <form onSubmit={handleSubmit}>
                                    <PrimaryButton name='Submit' loading={isSubmitting ? true : false} type='submit' />
                                </form>
                            </div>
                        </Prompt>
                    </Dialog>
                    : null
            }
            <div onClick={() => {
                setToggleNotification(true)
                mutation.mutate({
                    notificationId: notificationID
                })
            }} className={styles.cardContainer}>
                <div>
                    <h2 className={RegularPoppins.className}>{title}</h2>
                    <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
