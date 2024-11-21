"use client"


import React from 'react'
import styles from '@/styles/dashboard/job/generateReport.module.scss'
import PropmptStyles from '@/styles/components/prompt.module.scss';
import Prompt from '@/components/prompt'
import { useFormik } from 'formik';
import { CSVLink } from 'react-csv'

import { CancelBtn, PrimaryButton } from '@/components/button';
import { InputCalendar } from '@/components/input';
import Label from '@/components/label';
import { GenerateReportValidationSchema } from '@/validations/generateReport.validation';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import toast from 'react-hot-toast';
import ToastNotification from '@/components/notification';
import { GenerateReportApplicant } from '@/util/Mutation/application.mutation';
import { RegularPoppins } from '@/components/typograhy';
import { TbX } from 'react-icons/tb';
import { Formatter } from '@/util/formatter';


export default function GenerateReport({ close, id }: any) {



    const mutation = useMutation({
        mutationKey: ["GenerateReport"],
        mutationFn: async (inputValues: { jobPostId: string, startDate: string, endDate: string }) => {
            return await GraphQLRequest(GenerateReportApplicant, inputValues)
        },
        onSuccess: (data) => {
            toast.success("Successfully Generated Report")
            console.log(data)
        }
    })

    const { errors, touched, handleSubmit, setFieldValue, values } = useFormik({
        initialValues: {
            startDate: "",
            endDate: ""
        },
        validationSchema: GenerateReportValidationSchema,
        onSubmit: async (data) => {
            await mutation.mutateAsync({
                jobPostId: id,
                startDate: values.startDate,
                endDate: values.endDate
            })
        }
    })



    const headers = [
        { label: "Applicant ID", key: "id" },
        { label: "Lastname", key: "lastname" },
        { label: "Firstname", key: "firstname" },
        { label: "Status", key: "status" },
        { label: "Resume", key: "resume" },
        { label: "Score", key: "score" },
        { label: "Date Applied", key: "applied" }
    ]
    return (
        <div className={styles.container}>
            {mutation.data ? <div className={styles.generatedReport}>
                <div className={styles.generatedHeader}>
                    <h2 className={RegularPoppins.className}>Generated Report</h2>
                    <button onClick={close}>
                        <TbX size={23} />
                    </button>
                </div>
                <div className={styles.generateBody}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Lastname</th>
                                <th>Firstname</th>
                                <th>Resume</th>
                                <th>Score</th>
                                <th>Date Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mutation.data.generateApplicantByJobPostID.map(({ applicationID, id, status, createdAt, score, resume, user }: { applicationID: string, id: string, status: string, createdAt: any, score: any, resume: any, user: any, }) => (
                                <tr key={applicationID}>
                                    <td>
                                        <span>{id}</span>
                                    </td>
                                    <td>
                                        <span>{user.myProfile.lastname}</span>
                                    </td>
                                    <td>
                                        <span>{user.myProfile.firstname}</span>
                                    </td>
                                    <td>
                                        <span>{id}</span>
                                    </td>
                                    <td>
                                        <span>{score?.score}%</span>
                                    </td>
                                    <td>
                                        {Formatter(createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.generateFooter}>
                    <CSVLink headers={headers} filename={''} style={{ width: "100%", height: "50px", display: "flex", justifyContent: "flex-end" }} data={mutation.data.generateApplicantByJobPostID.map(({ applicationID, id, status, createdAt, score, resume, user }: { applicationID: string, id: string, status: string, createdAt: any, score: any, resume: any, user: any, }) => {
                        return {
                            id: id,
                            lastname: user.myProfile.lastname,
                            firstname: user.myProfile.firstname,
                            status: status,
                            resume: resume?.resume,
                            score: `${score.score}%`,
                            applied: createdAt
                        }
                    })}>
                        <button type="submit">
                            <span>Download</span>
                        </button>
                    </CSVLink>
                </div>
            </div> :
                <Prompt title='Generate Report'>
                    <div className={PropmptStyles.body}>
                        <Label name='Start Date' required={true} />
                        <InputCalendar name='startDate' errors={errors.startDate} touched={touched.startDate} onChange={setFieldValue} placeholder='Start Date' value={values.startDate} />
                        <Label name='End Date' required={true} />
                        <InputCalendar name='endDate' errors={errors.endDate} touched={touched.endDate} onChange={setFieldValue} placeholder='End Date' value={values.endDate} />
                    </div>
                    <div className={PropmptStyles.footer}>
                        <CancelBtn onClose={close} />
                        <form onSubmit={handleSubmit}>
                            <PrimaryButton loading={false} name='Generate' type='submit' />
                        </form>

                    </div>
                </Prompt>}

            <ToastNotification />
        </div>
    )
}
