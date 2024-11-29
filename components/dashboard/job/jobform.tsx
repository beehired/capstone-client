"use client"
import styles from '@/styles/dashboard/job/jobform.module.scss';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { TbCheck, TbPdf, TbPlus, TbTrash, TbUpload, TbX } from 'react-icons/tb'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { CreateJobValidationSchema, UpdateJobPostSchema } from '@/validations/job'
import { CreateJobPost, UpdateJobPost } from '@/util/Mutation/job.mutation'
import { SkillsPagination } from '@/util/Query/skills.query'
import { toast } from 'react-hot-toast'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { useQuery } from '@tanstack/react-query'
import Currencies from '@/util/currencies.json'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';

import Form from '@/components/form'
import ToastNotification from '@/components/notification'
import Label from '@/components/label'
import SpanError from '@/components/Error/spanError'
import InputRadio from '@/components/radio'
import SelectForm from '@/components/select'
import JobReview from './review'
import RichTextEditor from '@/components/richtext/richtex'
import { CheckboxV2 } from '@/components/checkbox'
import { PrimaryButton } from '@/components/button'
import { InputNumber, InputV1 } from '@/components/input'
import { durations, experience, jobtype, locations, stepInfo, } from '@/util';
import store from 'store2';
import { queryClient } from '@/lib/provider';
import { GetJobPostID } from '@/util/Query/job.query';
import Dropzone from 'react-dropzone';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

type JobPost = {
    jobPostId: string,
    title: string
    description: string,
    employment: string,
    location: string,
    duration: string,
    jobType: string[]
    skills: string[]
    currency: string
    fixed: boolean,
    salary: number,
    max: number,
    min: number
    agreement: string
}

function useJobPostID(id: any) {
    return useQuery({
        queryKey: ["JobPost", id],
        queryFn: async () => {
            const { getJobPostById } = await GraphQLRequest(GetJobPostID, {
                jobPostId: id
            })

            return getJobPostById
        }
    })
}

export default function JobForm({ id }: any) {


    const [fileUpload, setFileUpload] = useState<File | null>();
    const user = store.get("UserAccount");
    const router = useRouter();
    const [search, setSearch] = useState("")
    const post = store.get("jobPost")


    const { data: searchSkills } = useQuery({
        queryKey: ["SearchQuery", search],
        queryFn: async () => {
            const { skillsPagination } = await GraphQLRequest(SkillsPagination, {
                search: search,
                input: {
                    take: 40,
                    page: 1
                }
            })

            return skillsPagination
        }
    })

    const { data: UpdateData } = useJobPostID(id);


    const [CreateMutation] = useMutation(CreateJobPost, {
        onCompleted: (data) => {
            if (data.createJobPost.jobPostID) {
                toast.success("Successfully Added")
                router.push(`/dashboard/employer/jobs/post?id=${data.createJobPost.jobPostID}`)
                queryClient.invalidateQueries({ queryKey: ["JobPosts"] })
                store.remove("jobPost")
                resetForm()
            }
            if (data.createJobPost.code) {
                toast.error(data.createJobPost.message)
            }
        }
    })
    const [UdpateMutation] = useMutation(UpdateJobPost, {
        onCompleted: (data) => {
            toast.success("Successfully Updated")
            queryClient.invalidateQueries({ queryKey: ["JobPosts"] })
        }
    })

    let skills: string[] = []

    UpdateData?.skills.map(({ skills: skilled }: { skills: string }) => {
        skills.push(skilled)
    })



    const { errors, touched, handleChange, values, handleSubmit,
        isSubmitting, setFieldValue, handleBlur, resetForm } = useFormik<JobPost>({
            initialValues: {
                jobPostId: id,
                title: post?.title || (UpdateData?.title ?? ""),
                description: post?.description || (UpdateData?.description ?? ""),
                employment: post?.employmenty || (UpdateData?.experience ?? ""),
                location: post?.location || (UpdateData?.location ?? ""),
                duration: post?.duration || (UpdateData?.duration ?? ""),
                jobType: post?.jobType || (UpdateData?.JobType ?? []),
                skills: skills ?? [],
                fixed: post?.fixed || (Boolean(UpdateData?.salary?.fixed) || false),
                currency: post?.currency || (UpdateData?.salary?.currency ?? ""),
                salary: post?.salary || (UpdateData?.salary.fixed ? UpdateData?.salary.fixed : 0),
                max: parseInt(post?.max) || (UpdateData?.salary?.max ? parseInt(UpdateData?.salary?.max) : 0),
                min: parseInt(post?.min) || (UpdateData?.salary?.min ? parseInt(UpdateData?.salary?.min) : 0),
                agreement: "",
            },
            enableReinitialize: true,
            validationSchema: UpdateData ? UpdateJobPostSchema : CreateJobValidationSchema,
            onSubmit: async (values, { setSubmitting }) => {
                setSubmitting(true)
                if (UpdateData) {
                    if (values.fixed == true) {
                        await UdpateMutation({
                            variables: {
                                jobPostId: values.jobPostId,
                                companyId: user?.user?.company.companyID,
                                input: {
                                    title: values.title,
                                    description: values.description,
                                    JobType: values.jobType,
                                    location: values.location,
                                    duration: values.duration,
                                    experience: values.employment,
                                },
                                salary: {
                                    fixed: values.salary,
                                    currency: values.currency
                                },
                                skills: values.skills,
                            }
                        })
                    } else {
                        await UdpateMutation({
                            variables: {
                                jobPostId: values.jobPostId,
                                companyId: user?.user?.company.companyID,
                                input: {
                                    title: values.title,
                                    description: values.description,
                                    JobType: values.jobType,
                                    location: values.location,
                                    duration: values.duration,
                                    experience: values.employment,
                                },
                                salary: {
                                    max: values.max,
                                    min: values.min,
                                    currency: values.currency
                                },
                                skills: values.skills,
                            }
                        })
                    }
                } else {
                    if (values.fixed == true) {
                        await CreateMutation({
                            variables: {
                                companyId: user?.user?.company.companyID,
                                input: {
                                    title: values.title,
                                    description: values.description,
                                    JobType: values.jobType,
                                    location: values.location,
                                    duration: values.duration,
                                    experience: values.employment,
                                },
                                salary: {
                                    fixed: values.salary,
                                    currency: values.currency
                                },
                                file: fileUpload,
                                skills: values.skills,
                            }
                        })
                    } else {
                        await CreateMutation({
                            variables: {
                                companyId: user?.user?.company.companyID,
                                input: {
                                    title: values.title,
                                    description: values.description,
                                    JobType: values.jobType,
                                    location: values.location,
                                    duration: values.duration,
                                    experience: values.employment,
                                },
                                salary: {
                                    max: values.max,
                                    min: values.min,
                                    currency: values.currency
                                },
                                file: fileUpload,
                                skills: values.skills,
                            }
                        })
                    }
                }
                setSubmitting(false)
            }
        })


    const onHandleCurrencies = (e: any) => {
        setFieldValue("currency", e.target.value)
    }

    const onHandleDuration = (e: any) => {
        setFieldValue("duration", e.target.value)
    }

    const onHandleLocations = (e: any) => {
        setFieldValue("location", e.target.value)
    }

    const [step, setStep] = useState(1)

    useEffect(() => {
        store.set("jobPost", { ...values })
    }, [values])

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                {stepInfo.map(({ name, steps }) => (
                    <div key={steps} className={styles.stepContainer}>
                        <div className={step >= steps ? `${styles.stepCircle} ${styles.active}` : `${styles.stepCircle} ${styles.inactive}`}>
                            {step > steps ? <TbCheck size={18} /> :
                                <span className={RegularPoppins.className}>{steps}</span>}
                        </div>
                        <span className={`${styles.name} ${RegularPoppins.className}`}>{name}</span>
                    </div>
                ))}
            </div>
            <div className={styles.job}>
                <Form onSubmit={handleSubmit}>
                    {step === 1 &&
                        <div className={styles.step1}>
                            <h2 className={RegularPoppins.className}>Basic Information</h2>
                            <div className={styles.first}>
                                <div className={styles.title}>
                                    <Label name='Job title' required={true} />
                                    <InputV1 name='title' onChange={handleChange} placeholder='Job Title' type='text' value={values.title} errors={errors.title} touched={touched.title} />
                                </div>
                            </div>

                            <div className={styles.two}>
                                <Label name="Employment Type" required={true} />
                                <div className={styles.experience}>
                                    {experience.map((exp) => (
                                        <div key={exp}>
                                            <InputRadio value={exp} name='employment' onChange={handleChange} checked={exp === values.employment} />
                                            <label>{exp}</label>
                                        </div>
                                    ))}
                                </div>
                                {errors.employment && touched.employment ? <SpanError message={errors.employment} /> : null}
                            </div>
                            <div className={styles.two}>
                                <Label name="Job Type" required={true} />
                                <div className={styles.jobType}>
                                    {jobtype.map((jobtype) => (
                                        <div key={jobtype}>
                                            <CheckboxV2 value={jobtype} checked={values.jobType ? values?.jobType.includes(jobtype) : false} name={'jobType'} onChange={handleChange} onBlur={handleBlur} />
                                            <label>{jobtype}</label>
                                        </div>
                                    ))}

                                </div>
                                {errors.employment && touched.employment ? <SpanError message={errors.employment} /> : null}
                            </div>
                            <div className={styles.first}>
                                <div className={styles.title}>
                                    <Label name="Location" required={true} />
                                    <SelectForm title='' size={locations} value={values.location} onClick={onHandleLocations} errors={errors.location} touched={touched.location} />
                                </div>
                                <div className={styles.calendar}>
                                    <Label name="Project Duration" required={true} />
                                    <SelectForm title='Project length' size={durations} value={values.duration} onClick={onHandleDuration} errors={errors.duration} touched={touched.duration} />
                                </div>
                            </div>
                            <div className={styles.payment}>

                                <div className={styles.currency}>
                                    <Label name="Currency" required={true} />
                                    <SelectForm title='Currency' size={Currencies} value={values.currency} onClick={onHandleCurrencies} errors={errors.currency} touched={touched.currency} />
                                </div>
                                {values.fixed ?
                                    <div className={styles.currency}>
                                        <Label name="Fixed Salary" required={true} />
                                        <InputNumber name='salary' value={values.salary} onChange={handleChange} errors={errors.salary} touched={touched.salary} />
                                    </div>

                                    :
                                    <div className={styles.temp}>
                                        <div className={styles.pay}>
                                            <Label name="Minimum Salary" required={true} />
                                            <InputNumber name='min' value={values.min} onChange={handleChange} errors={errors.min} touched={touched.min} />
                                        </div>
                                        <div className={styles.pay}>
                                            <Label name="Maximum Salay" required={true} />
                                            <InputNumber name='max' value={values.max} onChange={handleChange} errors={errors.max} touched={touched.max} />
                                        </div>
                                    </div>}
                            </div>
                            <div className={styles.fixed}>
                                <CheckboxV2 name='fixed' onChange={handleChange} onBlur={handleBlur} value={values.fixed} checked={values.fixed ? true : false} />
                                <span className={RegularPoppins.className}>This Project is based on Fixed price.</span>
                            </div>
                            {errors.fixed && touched.fixed ? <SpanError message={errors.fixed} /> : null}
                            <div></div>
                            <div className={styles.skills}>
                                <Label name="Add Skills" required={true} />
                                <input type="search" placeholder='search javascript, typescript, videographer, virtual assistant, content creator, and etc' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.searchBox} />
                                <div className={styles.skillsContainer}>
                                    {isEmpty(searchSkills?.item) ?
                                        <button
                                            type="button"
                                            className={values.skills.includes(search as never) ? `${styles.active}` : ""}
                                            onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                                                const skillToToggle = e.currentTarget.value;

                                                if (values.skills.includes(skillToToggle as never)) {
                                                    const updatedSkills = values.skills.filter((a) => a !== skillToToggle);
                                                    setFieldValue("skills", updatedSkills);
                                                } else {
                                                    setFieldValue("skills", [...values.skills, skillToToggle]);
                                                }
                                            }}
                                            value={search} // Use the `search` value as the button's value
                                        >
                                            {values.skills.includes(search as never) ?
                                                <TbX size={18} /> :
                                                <TbPlus size={18} />}
                                            <span className={MediumPoppins.className}>{search}</span>
                                        </button>
                                        : searchSkills?.item.map(({ skillsID, skills }: { skillsID: never, skills: never }) => (
                                            <button className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button" key={skillsID}
                                                onClick={(e) => {

                                                    const updatedSkills = values.skills.includes(e.currentTarget.value as never)
                                                        ? values.skills.filter((a: any) => a !== e.currentTarget.value)
                                                        : [...values.skills, e.currentTarget.value];

                                                    setFieldValue("skills", updatedSkills);
                                                }}>
                                                <TbPlus size={18} />
                                                <span className={MediumPoppins.className}>{skills}</span>
                                            </button>
                                        ))
                                    }
                                </div>

                                {errors.skills && touched.skills ? <SpanError message={errors.skills} /> : null}
                            </div>
                            {isEmpty(skills) ? null : <hr />}
                            <div className={styles.skills}>
                                <div className={styles.skillsContainer}>
                                    {values.skills.map((skills) => (
                                        <button key={skills}
                                            className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button"
                                            onClick={(e) => {

                                                const updatedSkills = values.skills.includes(e.currentTarget.value as never)
                                                    ? values.skills.filter((a: any) => a !== e.currentTarget.value)
                                                    : [...values.skills, e.currentTarget.value];

                                                setFieldValue("skills", updatedSkills);
                                            }}
                                        >
                                            {values.skills.includes(skills) ?
                                                <TbX size={18} /> :
                                                <TbPlus size={18} />}
                                            <span className={MediumPoppins.className}>{skills}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {
                        step === 2 &&
                        <>
                            <Label name='Job Description' required={true} />
                            <RichTextEditor value={values.description} setFieldValue={setFieldValue} />
                            {errors.description && touched.description ? <SpanError message={errors.description} /> : null}
                            <Label name='Upload your Disclosure Agreement' required={true} />
                            {fileUpload ?
                                <div className={styles.file}>
                                    <div className={styles.info}>
                                        <div className={styles.pdf}>
                                            <TbPdf size={35} />
                                        </div>
                                        <div className={styles.details}>
                                            <span className={RegularPoppins.className}>{fileUpload.name}</span>
                                            <span className={RegularPoppins.className}>{format(new Date(fileUpload.lastModified), "MMMM dd, yyyy")}</span>
                                        </div>
                                    </div>
                                    <div className={styles.deleteBtn}>

                                        <button onClick={() => setFileUpload(null)} type='button'>
                                            <TbTrash size={23} />
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className={styles.fileUpload}>

                                    <Dropzone
                                        onDropRejected={(err) => {
                                            console.log('Error:', err); // Check if this logs
                                            toast.error("Invalid File Format");
                                        }}
                                        onDrop={acceptedFiles => {
                                            setFileUpload(acceptedFiles[0])
                                            setFieldValue("agreement", acceptedFiles[0]?.name)
                                        }}
                                        accept={{
                                            "application/pdf": [".pdf"]
                                        }}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} name="agreement" />
                                                    <div className={styles.uploading}>
                                                        <TbUpload size={45} />
                                                    </div>
                                                    <p className={RegularPoppins.className}>Drag and Drop your Disclosure Agreement, or click to select files (PDF Only)</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>

                                </div>
                            }
                            {errors.agreement && touched.agreement ? <SpanError message={errors.agreement} /> : null}
                        </>
                    }

                    {
                        step === 3 ? <>
                            <JobReview title={values.title} description={values.description} employment={values.employment} location={values.location} duration={values.duration} jobType={values.jobType} skills={values.skills} fixed={values.fixed} currency={values.currency} salary={values.salary} min={values.min} max={values.max} />
                        </> : null
                    }
                    <div className={styles.footer}>
                        <span className={`${RegularPoppins.className} ${styles.stepSpan}`}>Step {step} of {stepInfo.length}</span>
                        <div className={styles.stepGroup}>
                            {isSubmitting ? null :
                                <button type="button" disabled={step <= 1} onClick={() => setStep(() => step - 1)}>
                                    <span className={RegularPoppins.className}>Back</span>
                                </button>}
                            {step !== 3 ?
                                <button type="button" onClick={() => setStep(() => step + 1)}>
                                    <span className={RegularPoppins.className}>Continue</span>
                                </button> :
                                <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                            }
                        </div>
                    </div>
                </Form>

            </div>
            <ToastNotification />
        </div>
    )
}
