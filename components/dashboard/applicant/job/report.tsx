import React from 'react'
import styles from '@/styles/components/report.module.scss';
import { CancelBtn, PrimaryButton } from '@/components/button';
import { RegularPoppins } from '@/components/typograhy';
import { JobPostReport } from '@/util';
import { useFormik } from 'formik';
import InputRadio from '@/components/radio';
import store from 'store2';
import { ReportJobPost } from '@/validations/job';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { CreateReportJobPost } from '@/util/Mutation/report.mutation';
import toast from 'react-hot-toast';
import { ReportTypes } from '@/types/report';
import SpanError from '@/components/Error/spanError';
import ToastNotification from '@/components/notification';

export default function Report({ jobPostId, close }: any) {

    const user = store.get("UserAccount");


    const mutation = useMutation({
        mutationKey: ["JobReport", jobPostId],
        mutationFn: async (inputValues: ReportTypes) => {
            return await GraphQLRequest(CreateReportJobPost, inputValues)
        },
        onSuccess: (data) => {
            if (data.createReportJobPost.reportID) {
                toast.success("You successfully reported a Job Post");
                close();
            }
        }
    })

    const { errors, touched, handleSubmit, handleChange, values, isSubmitting } = useFormik({
        initialValues: {
            jobPostID: jobPostId,
            userID: user?.id,
            message: ""
        },
        validationSchema: ReportJobPost,
        onSubmit: async () => {
            await mutation.mutateAsync({
                jobPostId: values.jobPostID,
                message: values.message,
                userId: values.userID
            })
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.reportContainer}>
                <div className={styles.header}>
                    <h1 className={RegularPoppins.className}>Report Job Post</h1>
                </div>
                <div className={styles.body}>
                    {errors.message && touched.message ? <SpanError message={errors.message} /> : null}
                    {JobPostReport.map(({ name, description }) => (
                        <div className={styles.card} key={name}>
                            <div className={styles.inputContainer}>
                                <InputRadio name='message' onChange={handleChange} value={name} />
                            </div>
                            <div className={styles.info}>
                                <span>{name}</span>
                                <p>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <CancelBtn onClose={close} />
                    <form onSubmit={handleSubmit}>
                        <PrimaryButton name='Submit' type='submit' loading={isSubmitting ? true : false} />
                    </form>
                </div>
            </div>
            <ToastNotification />
        </div>
    )
}
