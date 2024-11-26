"use client"
import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import styles from '@/styles/dashboard/job/schedule.module.scss'
import { TbX } from 'react-icons/tb'
import Label from '@/components/label'
import { InputCalendar, InputTime, InputV1 } from '@/components/input'
import Textarea from '@/components/textarea'
import { useFormik } from 'formik'
import { CreateScheduleValidation } from '@/validations/schedule.validation'
import SelectForm from '@/components/select'
import { scheduleDuration } from '@/util'
import { CancelBtn, PrimaryButton } from '@/components/button'
import { useMutation as ApolloMutation, gql } from '@apollo/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { CreateScheduleMeeting } from '@/util/Mutation/schedule.mutation'
import toast from 'react-hot-toast'
import { ScheduleTypes } from '@/types/schudule'
import { format } from 'date-fns'
import store from 'store2'
import { getCookie, setCookie } from 'cookies-next'
import ToastNotification from '@/components/notification'
import { queryClient } from '@/lib/provider'
import { GetMyZoomIntegration } from '@/util/Query/zoom.query'
import { RegularPoppins } from '@/components/typograhy'
import Link from 'next/link'

const app = gql`mutation Zoom_access($userId: ID!) {
  zoom_access(userID: $userId) {
    access_token
  }
}`



export default function CalendarSchedule({ close, id, applicantId }: any) {


    const user = store.get("UserAccount");
    const [accessToken, setAccessToken] = useState<string | null>(null)


    const { data } = useQuery({
        queryKey: ["zoomkey", user?.id],
        queryFn: async () => {
            const { getMyZoomIntegration } = await GraphQLRequest(GetMyZoomIntegration, {
                userId: user?.id
            })

            return getMyZoomIntegration
        }
    })

    const [mutate] = ApolloMutation(app, {
        variables: {
            userId: user?.id
        },
        errorPolicy: "all",
        onError: async (data) => {
            toast.error(data.message)
        }
    })

    const scheduleTokenRefresh = (expiresIn: number) => {
        const refreshTime = (expiresIn - 300) * 1000;
        setTimeout(() => {
            refreshToken();
        }, refreshTime)
    }

    const refreshToken = useCallback(() => {
        mutate({
            onCompleted: (data) => {
                const newToken = data.zoom_access.access_token
                const expiresIn = data.zoom_access.expires_in

                setCookie("zoom_actkn", newToken);
                setAccessToken(newToken);

                scheduleTokenRefresh(expiresIn)
            }
        })
    }, [])



    useEffect(() => {
        const token = getCookie("zzom_actkn");
        if (token) {
            setAccessToken(token as string)
        } else {
            refreshToken()
        }
    }, [refreshToken])

    const mutation = useMutation({
        mutationKey: ["CreateScheduleMeeting"],
        mutationFn: async (inputValues: ScheduleTypes) => {
            return await GraphQLRequest(CreateScheduleMeeting, inputValues)
        },
        onSuccess: (data) => {
            if (data.createSchedule.scheduleID) {
                toast.success("Schedule Meeting Successfully Created")
                queryClient.invalidateQueries({
                    queryKey: ["CalendarDate"]
                })
            }
        }
    })

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            duration: 30,
            startTime: "",
            endTime: ""
        },
        validationSchema: CreateScheduleValidation,
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({
                input: {
                    title: values.title,
                    description: values.description,
                    duration: values.duration,
                    startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
                    startTime: values.startTime,
                    endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
                    endTime: values.endTime
                },
                receiverId: id,
                senderId: user?.id,
                actkn: accessToken,
                applicantId: applicantId
            })
            setSubmitting(false)
        }
    })

    const onHandleDuration = (e: ChangeEvent<HTMLSelectElement>) => {
        setFieldValue("duration", e.target.value)
    }

    return (
        <div className={styles.container}>

            <div className={styles.scheduleContainer}>
                <div className={styles.header}>
                    <button className={styles.btn} onClick={close}>
                        <TbX size={28} />
                    </button>
                </div>

                {data ?
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label name='Topic' required={true} />
                            <InputV1
                                name='title'
                                errors={errors.title}
                                touched={touched.title}
                                value={values.title}
                                onChange={handleChange}
                                placeholder='Topic'
                                type='text' />

                            <Label name='Start Date and Time' required={true} />
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
                            <Label name='End Date and Time' required={true} />
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
                            <Label name='Description' required={false} />
                            <Textarea
                                name={'description'}
                                errors={errors.description}
                                touched={touched.description}
                                onChange={handleChange}
                                placeholder='optional'
                                value={values.description}
                            />
                            <Label name='Duration' required={true} />
                            <SelectForm errors={errors.duration} touched={touched.duration} size={scheduleDuration} title='Select meeting duration' value={values.duration} onClick={onHandleDuration} />
                        </div>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </form> : <div>
                        <span className={RegularPoppins.className}>It looks like your Zoom integration is not yet configured. Please go to the settings page to set it up and enable full functionality. {" "}
                            <Link href={`/dashboard/employer/settings/zoom`}>Click here.</Link>
                        </span></div>}


            </div>
            <ToastNotification />
        </div>
    )
}
