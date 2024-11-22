"use client"

import React, { useEffect } from 'react'
import styles from '@/styles/dashboard/applicant/job/similar.module.scss'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { JobPostSimilar } from '@/util/Query/job.query'
import Image from 'next/image'
import { FormatterDistance } from '@/util/formatter'
import { RegularPoppins } from '@/components/typograhy'
import { useRouter } from 'next/navigation'
import FavouriteButton from '@/components/favouriteButton'
import parse from 'html-react-parser'

type SimilarJobPost = {
    jobPostID: string
    title: string
    JobType: string[]
    createdAt: any,
    updatedAt: any,
    description: string
    totalApplicant: number
    getCompany: {
        companyName: string
        logo: {
            media: string
            mediaID: string
        }
    }
}

export default function SimilarJobs({ id, skillsData }: { id: string, skillsData: string[] }) {

    const router = useRouter();

    const { data } = useQuery({
        queryKey: ["SimilarJobPost", id],
        queryFn: async () => {
            const { getSimilarJobPost } = await GraphQLRequest(JobPostSimilar, {
                jobPostId: id,
                skills: skillsData,
                input: {
                    take: 10,
                    page: 1
                }
            })
            return getSimilarJobPost
        },
    })

    return (
        <div className={styles.container}>
            {data?.map(({ jobPostID, totalApplicant, title, description, JobType, createdAt, updatedAt, getCompany: { companyName, logo: { media, mediaID } } }: SimilarJobPost) => (
                <div className={styles.card} key={jobPostID}>
                    <div className={styles.header}>
                        <div className={styles.hs}>
                            <div className={styles.avatar}>
                                {!media ?
                                    <span className={RegularPoppins.className}>{companyName[0]}</span>
                                    : <Image src={media} alt="" height={80} width={80} priority />}
                            </div>
                            <div className={styles.info}>
                                <div>
                                    <h2 onClick={() => {
                                        router.push(`/freelancer/find-job/${jobPostID}`)
                                        router.refresh()
                                    }} className={RegularPoppins.className}>{title}</h2>
                                    <span>{companyName}</span>
                                </div>
                            </div>
                        </div>
                        <FavouriteButton size={24} jobPostId={jobPostID} />
                    </div>
                    <div>
                        {parse(description.slice(0, 200))}
                    </div>
                    <div className={styles.jobType}>
                        {JobType.map((jobType, index) => (
                            <span key={index}>{jobType}</span>
                        ))}
                    </div>
                    <div>
                        {FormatterDistance(createdAt)} &#x2022; {totalApplicant} Applied
                    </div>
                </div>
            ))}
        </div>
    )
}
