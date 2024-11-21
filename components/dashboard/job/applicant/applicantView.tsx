"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/job/applicantview.module.scss';
import { UpdateApplication } from '@/util/Mutation/application.mutation';
import { TbDiamond, TbDots, TbLink, TbX } from 'react-icons/tb';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetApplicantById } from '@/util/Query/application.query';
import Spinner from '@/components/spinner';
import { RegularPoppins } from '@/components/typograhy';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { AStatus } from '@/util';
import { UpdateApplicationTypes } from '@/types/application';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { queryClient } from '@/lib/provider';
import ToastNotification from '@/components/notification';
import NotAvailable from '@/components/notavailable';
import DefaultImage from '@/app/public/l60Hf.png'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApplicantView({ applicantId, close }: any) {


    const [activeToggle, setActtiveToggle] = useState(false);
    const router = useRouter()

    const onHandleActiveToggle = () => {
        setActtiveToggle(() => !activeToggle)
    }
    const { data, isLoading } = useQuery({
        queryKey: ['ApplicationID', applicantId],
        queryFn: async () => {
            const { getApplicationByID } = await GraphQLRequest(GetApplicantById, {
                applicationId: applicantId
            })

            return getApplicationByID
        }
    })

    const mutation = useMutation({
        mutationKey: ["UpdateApplication", applicantId],
        mutationFn: async (inputValues: UpdateApplicationTypes) => {
            return await GraphQLRequest(UpdateApplication, inputValues)
        },
        onSuccess: async (data) => {
            if (data.updateApplicationStatus.applicationID) {
                toast.success("Successfully Application Updated");
                queryClient.invalidateQueries({
                    queryKey: ["ApplicationID"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["JobPostApplication"]
                })
            }
        }
    })


    const { handleSubmit, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            applicantId: applicantId,
            status: ""
        },
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({
                applicationId: values.applicantId,
                status: values.status
            })
            setSubmitting(false)
        }
    })

    return (
        <div className={styles.container}>
            <ToastNotification />
            <div className={styles.applicantContainer}>
                <div className={styles.header}>
                    <button className={styles.btn} onClick={close}>
                        <TbX size={28} />
                    </button>
                </div>
                {isLoading ? <Spinner /> :
                    <div className={styles.profile}>
                        <div className={styles.info}>
                            <div className={styles.avatar}>
                                <Image src={isEmpty(data?.user?.myProfile?.avatar) ? DefaultImage : data?.user?.myProfile?.avatar?.media} alt="asd" fill objectFit='cover' priority objectPosition='center' />
                            </div>
                            <div className={styles.name}>
                                <div className={styles.headerName}>
                                    <h1 className={RegularPoppins.className}>
                                        {data?.user?.myProfile?.firstname} {" "}
                                        {data?.user?.myProfile?.lastname}
                                    </h1>
                                    <Link target='_blank' href={`/bee/${data?.user?.myProfile.profileID}`}>
                                        <TbLink size={18} />
                                    </Link>
                                </div>
                                <div className={styles.subInfo}>
                                    <a target="_blank" href={`${data?.resume?.resume}`}>
                                        View my Resume</a> &#x2022; <span>{data?.status}</span> &#x2022; <span>{data?.score.score}%</span>
                                </div>
                            </div>
                        </div>
                        {data?.status === "Reject" || data?.status === "Hired" ? null : <div className={styles.updateStatus}>
                            <button className={styles.btn} onClick={onHandleActiveToggle}>
                                <TbDots size={23} />
                            </button>
                            {
                                activeToggle && <div className={styles.statusContainer}>
                                    <form onSubmit={handleSubmit}>
                                        {isSubmitting ? <Spinner /> : AStatus.map((status) => (
                                            <button value={status} onClick={() => setFieldValue("status", status)} key={status}>
                                                <span className={RegularPoppins.className}>{status}</span>
                                            </button>
                                        ))}
                                    </form>
                                </div>
                            }
                        </div>}
                    </div>
                }
                {
                    isLoading ? <Spinner /> :
                        <div className={styles.topSkills}>
                            <div className={styles.topSkillHeader}>
                                <TbDiamond size={23} />
                                <h2 className={RegularPoppins.className}>Top Skill</h2>
                            </div>
                            <div className={styles.gr}>
                                <div className={styles.skill}>
                                    {data?.user?.myProfile?.skills.map(({ skillsID, skills }: { skillsID: string, skills: string }) => (
                                        <div key={skillsID}>
                                            <span className={RegularPoppins.className}>{skills}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                }
                {isLoading ? <Spinner /> :
                    <div className={styles.about}>
                        <h2 className={RegularPoppins.className}>About</h2>
                        <p className={RegularPoppins.className}>{data?.user.myProfile?.about?.bio}</p>
                    </div>
                }
                {
                    isLoading ? <Spinner /> :
                        <div className={styles.portfolio}>
                            <h2 className={RegularPoppins.className}>Work Experience</h2>
                            {isEmpty(data?.user?.myProfile?.portfolio) ? <NotAvailable /> : data?.user?.myProfile?.portfolio.map(({ portfolioID, title, description, companyName, employmentType, location, locationType, startYear, startMonth, endYear, endMonth, skills }: {
                                portfolioID: string, title: string, description: string, companyName: string, employmentType: string, location: String, locationType: string, startYear: string, startMonth: string, endYear: string, endMonth: string, skills: any
                            }) => (
                                <div className={styles.card} key={portfolioID}>
                                    <h2 className={RegularPoppins.className}>{title}</h2>
                                    <div>
                                        <span className={RegularPoppins.className}>{companyName} &#x2022; {locationType}</span>
                                    </div>
                                    <div className={styles.date}>
                                        <span className={RegularPoppins.className}>{startMonth} {startYear} - {!endMonth && !endYear ? "Present" : `${endMonth} ${endYear}`}</span>
                                    </div>
                                    <div className={styles.date}>
                                        <span className={RegularPoppins.className}>{location} - {employmentType}</span>
                                    </div>
                                    <p>{description}</p>
                                </div>
                            ))}
                        </div>
                }
                {
                    isLoading ? <Spinner /> :
                        <div className={styles.education}>
                            <h2 className={RegularPoppins.className}>Education Background</h2>
                            {isEmpty(data?.user.myProfile.education) ? <NotAvailable /> : data?.user.myProfile.education.map(({ educationID, school, degree, study, startMonth, startYear, endYear, endMonth }: {
                                educationID: string, school: string, degree: string, study: string, startYear: string, startMonth: string, endYear: string, endMonth: string, skills: any
                            }) => (
                                <div className={styles.card} key={educationID}>
                                    <h2 className={RegularPoppins.className}>{school}</h2>
                                    <div>
                                        <span className={RegularPoppins.className}>{degree} in {study}</span>
                                    </div>
                                    <div className={styles.date}>
                                        <span className={RegularPoppins.className}>{startMonth} {startYear} - {endMonth === null && endYear === null ? "Present" : `${endMonth} ${endYear}`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}
