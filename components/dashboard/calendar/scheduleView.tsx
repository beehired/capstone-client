"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/schedule/view.module.scss'
import Dialog from '@/components/dialog'
import Prompt from '@/components/prompt'
import store from 'store2'
import toast from 'react-hot-toast'
import Label from '@/components/label'
import ToastNotification from '@/components/notification'
import PromptStyles from '@/styles/components/prompt.module.scss'
import { CancelBtn, PrimaryButton } from '@/components/button'
import { InputV1, InputCalendar, InputTime } from '@/components/input'
import { useFormik } from 'formik'
import { UpdateScheduleTypes } from '@/types/schudule'
import { UpdateScheduleMeeting } from '@/util/Mutation/schedule.mutation'
import { UpdateScheduleValidation } from '@/validations/schedule.validation'
import { format } from 'date-fns'
import Textarea from '@/components/textarea'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetScheduleById } from '@/util/Query/schedule.query'
import { RegularPoppins } from '@/components/typograhy'
import { TbBrandZoom, TbEdit, TbMapPin, TbX } from 'react-icons/tb'
import { Formatter } from '@/util/formatter'
import { queryClient } from '@/lib/provider'

export default function ScheduleView({ id, close }: any) {

    const [edit, setEdit] = useState(false);
    const user = store.get("UserAccount");

    const onHandleEdit = () => {
        setEdit(() => !edit);
    }

    const { data } = useQuery({
        queryKey: ["GetScheduleByID"],
        queryFn: async () => {
            const { getScheduleById } = await GraphQLRequest(GetScheduleById, {
                scheduleId: id
            })

            return getScheduleById
        }
    })


    const mutation = useMutation({
        mutationKey: ["UpdateMeetingSchedule"],
        mutationFn: async (inputValues: UpdateScheduleTypes) => {
            return await GraphQLRequest(UpdateScheduleMeeting, inputValues)
        },
        onSuccess: (data) => {
            if (data.updateSchedule.scheduleID) {
                toast.success("Schedule Meeting Successfully Updated")
                queryClient.invalidateQueries({
                    queryKey: ["CalendarDate"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["GetScheduleByID"]
                })
            }
        }
    })

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            scheduleId: id,
            title: data?.title,
            description: data?.description,
            startDate: data?.startDate,
            endDate: data?.endDate,
            duration: data?.duration,
            startTime: data?.startTime,
            endTime: data?.endTime
        },
        enableReinitialize: true,
        validationSchema: UpdateScheduleValidation,
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({

                scheduleId: data?.scheduleID,
                input: {
                    title: values.title,
                    description: values.description,
                    startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
                    startTime: values.startTime,
                    endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
                    endTime: values.endTime
                },
            })
            setSubmitting(false)
        }
    })

    return (
        <div className={styles.container}>
            {
                edit ? <Dialog>
                    <div className={styles.editContainer}>
                        <Prompt title="Update Scehdule Calendar">
                            <div className={PromptStyles.inputHeader}>
                                <Label name='Topic' required={true} />
                                <InputV1
                                    name='title'
                                    errors={errors.title}
                                    touched={touched.title}
                                    value={values.title}
                                    onChange={handleChange}
                                    placeholder='Topic'
                                    type='text' />
                                <div>
                                    <Label name='Description' required={false} />
                                    <Textarea
                                        name={'description'}
                                        errors={errors.description}
                                        touched={touched.description}
                                        onChange={handleChange}
                                        placeholder='optional'
                                        value={values.description}
                                    />
                                </div>
                                <Label name='Start Date and Time' required={true} />
                                <div className={styles.statDate}>

                                    <div className={styles.time}>
                                        <InputCalendar
                                            name='startDate'
                                            errors={errors.startDate}
                                            onChange={setFieldValue}
                                            placeholder=''
                                            touched={touched.startDate}
                                            value={values.startDate}
                                        />
                                        <InputTime errors={errors.startTime} name={"startTime"} onChange={handleChange} touched={touched.startTime} value={values.startTime} />
                                    </div>
                                </div>
                                <Label name='End Date and Time' required={true} />
                                <div className={styles.statDate}>
                                    <div className={styles.time}>
                                        <InputCalendar
                                            name='endDate'
                                            errors={errors.endDate}
                                            onChange={setFieldValue}
                                            placeholder=''
                                            touched={touched.endDate}
                                            value={values.endDate}
                                        />
                                        <InputTime errors={errors.endTime} name={"endTime"} onChange={handleChange} touched={touched.endTime} value={values.endTime} />
                                    </div>
                                </div>
                            </div>
                            <div className={PromptStyles.footer}>
                                <CancelBtn onClose={onHandleEdit} />
                                <form onSubmit={handleSubmit}>
                                    <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                                </form>
                            </div>
                        </Prompt>
                    </div>
                </Dialog> : null
            }
            <div className={styles.scheduleContainer}>
                <div className={styles.head}>
                    {user?.role === "freelance" ? null : <button onClick={onHandleEdit}>
                        <TbEdit size={23} />
                    </button>}
                    <button onClick={close}>
                        <TbX size={23} />
                    </button>
                </div>
                <div className={styles.header}>
                    <div className={styles.box}>
                        <div className={styles.colored}></div>
                    </div>
                    <div className={styles.headerInfo}>
                        <h2 className={RegularPoppins.className}>{data?.title}</h2>
                        <span>{Formatter(data?.startDate)} {data?.startTime}-{data?.endTime}</span>
                    </div>
                </div>
                <div className={styles.links}>
                    <div>
                        <TbMapPin size={25} />
                    </div>
                    <span>{data?.link.slice(0, 50)}...</span>
                </div>
                <div className={styles.links}>
                    <div>
                        <TbBrandZoom size={25} />
                    </div>
                    <div className={styles.zoom}>
                        <span>Meeting Link</span>
                        <a href={data?.link}>{data?.link}</a>
                    </div>
                </div>
                <div className={styles.description}>
                    <span>Description</span>
                    <p>{data?.description}</p>
                </div>
            </div>
            <ToastNotification />
        </div>
    )
}
