"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/projects/project.module.scss';
import { format } from 'date-fns'
import { TbEdit, TbEye, TbNote, TbStatusChange, TbX } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import { RegularPoppins } from '@/components/typograhy';
import parse from 'html-react-parser'
import Prompt from '@/components/prompt';
import { useFormik } from 'formik';
import PromptStyles from '@/styles/components/prompt.module.scss'
import { CancelBtn, PrimaryButton } from '@/components/button';
import { InputCalendar, InputNumber, InputV1 } from '@/components/input';
import { ProjectDetailsSchema, ProjectStatusSchema } from '@/validations/project.validation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import store from 'store2';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { UpdateProjectDetails, UpdatePRojectStatus } from '@/util/Mutation/project.mutation';
import SelectForm from '@/components/select';
import { PStatusSelect } from '@/util';
import ToastNotification from '@/components/notification';
import { queryClient } from '@/lib/provider';
import Review from './review/review';
import Label from '@/components/label';

export default function ProjectCard({ title, status, startDate, endDate, amount, date, name, id, description, freelancerID }: any) {


    const user = store.get("UserAccount");
    const [toggleView, setToggleView] = useState(false)
    const [editProjectDetails, setEditProjectDetails] = useState(false)
    const [editStatus, setEditStatus] = useState(false);
    const [review, setReview] = useState(false);

    const onHandleToggleView = () => {
        setToggleView(() => !toggleView)
    }

    const onHandleEditToggle = () => {
        setEditProjectDetails(() => !editProjectDetails)
    }

    const onHandleReview = () => {
        setReview(() => !review)
    }


    const onHandleEditStatus = () => {
        setEditStatus(() => !editStatus)
    }

    const EditMutation = useMutation({
        mutationKey: ["EditProjectDetails"],
        mutationFn: async (inputValues: {
            projectOrganizerId: string,
            title: string,
            startDate: any,
            endDate: any
            amount: number,
            userId: string
        }) => {
            return await GraphQLRequest(UpdateProjectDetails, inputValues)
        },
        onSuccess: () => {
            toast.success("Successfully Project Details Updated")
            queryClient.invalidateQueries({
                queryKey: ["GetMyCompanyProject"]
            })
        }
    })


    const StatusMutation = useMutation({
        mutationKey: ["ProjectStatus"],
        mutationFn: async (inputValues: { projectOrganizerId: string, status: string, userId: string }) => {
            return await GraphQLRequest(UpdatePRojectStatus, inputValues)
        },
        onSuccess: () => {
            toast.success("Successfully Project Status Updated")
            queryClient.invalidateQueries({
                queryKey: ["GetMyCompanyProject"]
            })
        }
    })


    const { values: value, handleSubmit: StatusSubmit, errors: error, touched: touch, isSubmitting: submitting, setFieldValue } = useFormik({
        initialValues: {
            projectId: id,
            status
        },
        validationSchema: ProjectStatusSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            await StatusMutation.mutateAsync({
                projectOrganizerId: value.projectId,
                userId: user?.id,
                status: value.status
            })
        }
    })


    const onHandleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue("status", e.target.value)
    }

    const { values, handleSubmit, handleChange, errors, touched, isSubmitting, setFieldValue: setFieldValues } = useFormik({
        initialValues: {
            projectId: id,
            title,
            startDate,
            endDate,
            amount
        },
        validationSchema: ProjectDetailsSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            EditMutation.mutateAsync({
                title: values.title,
                projectOrganizerId: values.projectId,
                amount: values.amount,
                endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
                startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
                userId: user?.id
            })
        }
    })

    return (
        <div className={styles.tr}>

            {
                toggleView ?
                    <Dialog>
                        {editProjectDetails ? <Dialog>
                            <Prompt title="Edit Project Details">
                                <div className={PromptStyles.inputHeader}>
                                    <Label name='Title' required={true} />
                                    <InputV1
                                        name='title'
                                        onChange={handleChange}
                                        placeholder={title}
                                        type='text'
                                        value={values.title}
                                        errors={errors.title}
                                        touched={touched.title} />

                                    <Label name='Amount' required={true} />
                                    <InputNumber
                                        name='amount'
                                        errors={errors.amount}
                                        onChange={handleChange}
                                        touched={touched.amount}
                                        value={values.amount} />

                                    <Label name='Start Date' required={true} />
                                    <InputCalendar
                                        name='startDate'
                                        errors={errors.startDate}
                                        touched={touched.startDate}
                                        placeholder=''
                                        onChange={setFieldValues}
                                        value={values.startDate} />

                                    <Label name='End Date' required={true} />
                                    <InputCalendar name='endDate' errors={errors.endDate} touched={touched.endDate} placeholder='' onChange={setFieldValues} value={values.endDate} />
                                </div>
                                <div className={PromptStyles.footer}>
                                    {isSubmitting ? null : <CancelBtn onClose={onHandleEditToggle} />
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                                    </form>
                                </div>
                            </Prompt>
                        </Dialog> : null}

                        {
                            editStatus ? <Dialog>
                                <Prompt title='Update Project Status'>
                                    <div className={styles.as}>
                                        <SelectForm onClick={onHandleStatusChange} title='' errors={error.status} touched={touch.status} size={PStatusSelect} value={value.status} />
                                    </div>
                                    <div className={PromptStyles.footer}>
                                        {submitting ? null :
                                            <CancelBtn onClose={onHandleEditStatus} name="Cancel" />}
                                        <form onSubmit={StatusSubmit}>
                                            <PrimaryButton loading={submitting ? true : false} name='Confirm' type='submit' />
                                        </form>
                                    </div>
                                </Prompt>
                            </Dialog> : null
                        }
                        <div className={styles.toggleView}>
                            <div className={styles.projectView}>
                                <div className={styles.projectHeader}>
                                    <h2 className={RegularPoppins.className}>{title}</h2>
                                    <div className={styles.grpBtn}>
                                        {
                                            status === "Completed" ?
                                                null :
                                                 <button onClick={onHandleEditStatus}>
                                                    <TbStatusChange size={23} />
                                                </button>
                                        }
                                        <button onClick={onHandleEditToggle}>
                                            <TbEdit size={23} />
                                        </button>
                                        <button onClick={onHandleToggleView}>
                                            <TbX size={23} />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.projectBody}>
                                    <span><b>Status: </b>{status}</span>
                                    <span><b>Start Date: </b>{format(new Date(startDate), "MMMM dd, yyy")}</span>
                                    <span><b>End Date:</b> {format(new Date(endDate), "MMMM dd, yyyy")}</span>
                                    <span><b>Assigned To:</b> {name}</span>
                                    <span><b>Amount: </b> {amount}</span>
                                    <div>
                                        <span><b>Description: </b> </span>
                                    </div>

                                    <div>
                                        {parse(description)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    : null
            }
            {
                review ?
                    <Dialog>
                        <div className={styles.reviewContainer}>
                            <Review close={onHandleReview} freelancerID={freelancerID} />
                        </div>
                    </Dialog> : null
            }
            <div className={styles.td}>{title.length < 20 ? `${title}` : `${title.slice(0, 20)}...`}</div>
            <div className={styles.td}>{amount}</div>
            <div className={styles.td}>{status}</div>
            <div className={styles.td}>{name}</div>
            <div className={styles.td}>{format(new Date(date), "MMMM dd, yyyy")}</div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <button onClick={onHandleToggleView}>
                        <TbEye size={20} />
                    </button>
                    {status === "Completed" ? <button onClick={onHandleReview}>
                        <TbNote size={20} />
                    </button> : null}
                </div>
            </div>
            <ToastNotification />
        </div >
    )
}
