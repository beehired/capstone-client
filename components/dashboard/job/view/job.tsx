"use client"
import React, { useState } from 'react'
import styles from '@/styles/dashboard/job/slug.module.scss';
import PrompStyles from '@/styles/components/prompt.module.scss'
import toast from 'react-hot-toast';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { TbTrash, TbEdit, TbSearch, TbCloudDownload, TbAlertCircleFilled, TbSettings, TbArchive } from 'react-icons/tb';


// validation, types, utils, lib
import { ArchiveJobPost, JobSettingsMutation } from '@/util/Mutation/job.mutation';
import { GetJobPostID } from '@/util/Query/job.query'
import { GetApplicantByJobPostId } from '@/util/Query/application.query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { JobDeleteValidation, JobSettingValidation } from '@/validations/job';
import { ArchiveJobTypes } from '@/types/post.types';

//components
import { RegularPoppins } from '@/components/typograhy';
import { ButtonIconRoute, ButtonIconToggle, PrimaryButton } from '@/components/button';
import Dialog from '@/components/dialog';
import Spinner from '@/components/spinner';
import Pagination from '@/components/pagination';
import Prompt from '@/components/prompt';
import ToastNotification from '@/components/notification';
import GenerateReport from './generateReport';
import ApplicantCard from '../applicant/applicantCard';
import { queryClient } from '@/lib/provider';
import Label from '@/components/label';
import SpanError from '@/components/Error/spanError';

type ApplicationTypes = {
    applicationID: string
    id: string
    createdAt: any
    status: string
    resume: {
        resume: any
    }
    user: {
        userID: string
        email: string
        myProfile: {
            firstname: string
            lastname: string
        }
    },
    score: {
        score: string
    },
}

type JobStatus = {
    jobPostId: string
    applicationStatus: string,
    status: string
}

export default function Job({ id }: any) {

    const itemsPerPage = 20;
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("");
    const [generateToggle, setGenerateToggle] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [settingsBtn, setSettingsBtn] = useState(false);

    const router = useRouter();
    const debounceSearch = useDebounce(search, 100)
    const { data, isLoading } = useQuery({
        queryKey: ["JobPosts", id],
        queryFn: async () => {
            const { getJobPostById } = await GraphQLRequest(GetJobPostID, {
                jobPostId: id
            })


            return getJobPostById
        }
    })

    const { data: ApplicantData, isLoading: ApplicantLoading } = useQuery({
        queryKey: ["JobPostApplication", id, debounceSearch],
        queryFn: async () => {
            const { getApplicantJobPostByIdPagination } = await GraphQLRequest(GetApplicantByJobPostId, {
                search,
                input: {
                    take: itemsPerPage,
                    page: page
                },
                jobPostId: id
            })

            return getApplicantJobPostByIdPagination
        }
    })

    const onNextPage = () => {
        setPage(() => page + 1)
    }

    const onPrevPage = () => {
        setPage(() => page - 1)
    }

    const onHandleClose = () => {
        setDeleteBtn(() => !deleteBtn)
    }

    const onHandleToggleGenerateReport = () => {
        setGenerateToggle(() => !generateToggle)
    }

    const onHandleSettinsBtn = () => {
        setSettingsBtn(() => !settingsBtn)
    }


    const mutation = useMutation({
        mutationKey: ["ArchiveJobPost"],
        mutationFn: (inputValues: ArchiveJobTypes) => {
            return GraphQLRequest(ArchiveJobPost, inputValues)
        },
        onSuccess(data, variables, context) {
            if (data.archiveJobPost.jobPostID) {
                router.push('/dashboard/employer/jobs?archive=false')
                toast.success("Job Post Successfully Archived")
                queryClient.invalidateQueries({
                    queryKey: ["JobPosts"]
                })
            }

        },
    })


    const unMutation = useMutation({
        mutationKey: ["UnArchiveJobPost"],
        mutationFn: (inputValues: ArchiveJobTypes) => {
            return GraphQLRequest(ArchiveJobPost, inputValues)
        },
        onSuccess(data, variables, context) {
            router.push('/dashboard/employer/jobs?archive=false')
            toast.success("Successfully Unarchive Job Post")
            queryClient.invalidateQueries({
                queryKey: ["JobPosts"]
            })
        },
    })

    const { handleSubmit } = useFormik({
        initialValues: {
            id: id
        },
        validationSchema: JobDeleteValidation,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(false);

            if (data?.isArchive) {
                await unMutation.mutateAsync({
                    jobPostId: values.id,
                    boolean: false
                })
            } else {

                await mutation.mutateAsync({
                    jobPostId: values.id,
                    boolean: true
                })
            }
        }
    })


    const jobMutation = useMutation({
        mutationKey: ["JobSetting"],
        mutationFn: async (inputValues: { jobPostId: string, applicationStatus: string, status: string }) => {
            return await GraphQLRequest(JobSettingsMutation, inputValues)
        },
        onSuccess: () => {
            toast.success("Job Setting Applied")
        }
    })

    const { handleSubmit: JobSettingSubmit, values, errors, touched, isSubmitting, handleChange } = useFormik<JobStatus>({
        initialValues: {
            jobPostId: id,
            applicationStatus: data?.isOpen,
            status: data?.status
        },
        enableReinitialize: true,
        validationSchema: JobSettingValidation,
        onSubmit: async () => {
            await jobMutation.mutateAsync({
                jobPostId: values.jobPostId,
                applicationStatus: values.applicationStatus,
                status: values.status
            })
        }
    })
    return (
        <div className={styles.container}>
            {deleteBtn ?
                <Dialog>
                    <Prompt title={data?.isArchive ? "Do you want to Unarchive this?" : 'Do you want to archive?'} icon={<TbAlertCircleFilled size={23} />}>
                        <span className={`${PrompStyles.text} ${RegularPoppins.className}`}>{data?.isArchive ? `Are you sure you want to unarchive this job post? Unarchiving will add it back to the active listings, and all previously saved information will remain intact. Please confirm if you would like to proceed with unarchiving.` : `Are you sure you want to archive this job post? Archiving will remove it from the active listings, but all information will be saved for future reference. Please confirm if you would like to proceed with archiving.`}
                        </span>
                        <div className={PrompStyles.footer}>
                            <button onClick={onHandleClose} type="button" className={PrompStyles.cancelBtn}>
                                <span className={RegularPoppins.className}>Cancel</span>
                            </button>
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className={PrompStyles.deleteBtn}>
                                    <span className={RegularPoppins.className}>Confirm</span>
                                </button>
                            </form>
                        </div>
                    </Prompt>
                    <ToastNotification />
                </Dialog> : null}
            {
                settingsBtn ? <Dialog>
                    <Prompt title='Job Post Settings'>
                        <div className={PrompStyles.inputHeader}>
                            <Label name='Job Application Status' required={false} />
                            <select name="applicationStatus" value={values.applicationStatus} onChange={handleChange}>
                                <option>-</option>
                                <option value="Open">Open</option>
                                <option value="Close">Close</option>
                            </select>
                            {errors.applicationStatus && touched.applicationStatus ? <SpanError message={errors.applicationStatus} /> : null}
                            <Label name='Job Status' required={false} />
                            <select name="status" value={values.status} onChange={handleChange}>
                                <option>-</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                            </select>
                            {errors.status && touched.status ? <SpanError message={errors.status} /> : null}
                        </div>
                        <div className={PrompStyles.footer}>
                            {isSubmitting ? null :
                                <button onClick={onHandleSettinsBtn} type="button" className={PrompStyles.cancelBtn}>
                                    <span className={RegularPoppins.className}>Cancel</span>
                                </button>
                            }
                            <form onSubmit={JobSettingSubmit}>
                                <PrimaryButton loading={isSubmitting ? true : false} name='Save' type='submit' />
                            </form>
                        </div>
                    </Prompt>
                </Dialog> : null
            }
            <div className={styles.header}>
                {isLoading ? <Spinner />
                    : <div className={styles.title}>
                        <h2 className={RegularPoppins.className}>
                            {data?.title}
                        </h2>
                        <div className={styles.da}>
                            <ButtonIconToggle icon={<TbSettings size={23} />} setValue={setSettingsBtn} value={settingsBtn} />
                            <ButtonIconRoute icon={<TbEdit size={23} />} url={`/dashboard/employer/jobs/post/edit?id=${id}`} />
                            <ButtonIconToggle icon={<TbArchive size={23} />} setValue={setDeleteBtn} value={deleteBtn} />
                        </div>
                    </div>
                }
                {
                    generateToggle ?
                        <Dialog>
                            <GenerateReport close={onHandleToggleGenerateReport} id={id} />
                        </Dialog> : null
                }
            </div>
            <div className={styles.applicants}>
                <div className={styles.applicantHeader}>
                    <div className={styles.searchBox}>
                        <TbSearch size={23} />
                        <input type="search" className={RegularPoppins.className} placeholder='Search candidate by email or name' onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={onHandleToggleGenerateReport} className={styles.generateReport}>
                            <TbCloudDownload size={20} />
                            <span className={RegularPoppins.className}>Generate Report</span>
                        </button>
                    </div>
                </div>
                {ApplicantLoading ? <Spinner /> : <table>
                    <thead>
                        <tr>
                            <th>Applicant ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Skill Match</th>
                            <th>Date Applied</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ApplicantData?.item.map(({ applicationID, id, createdAt, status, user: { email, userID, myProfile: { firstname, lastname } }, resume, score: { score } }: ApplicationTypes) => (
                            <ApplicantCard key={applicationID} applicationID={applicationID} email={email} appID={id} createdAt={createdAt} status={status} id={userID} firstname={firstname} lastname={lastname} resume={resume?.resume} score={score} />
                        ))}
                    </tbody>
                </table>}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    hasPrevPage={data?.hasPrevPage}
                    hasNextPage={data?.hasNextPage}
                    totalItems={data?.totalItems}
                    currentPage={page}
                    totalPages={data?.totalPages}
                    nextButton={onNextPage}
                    prevButton={onPrevPage}
                />
            </div>
        </div >
    )
}
