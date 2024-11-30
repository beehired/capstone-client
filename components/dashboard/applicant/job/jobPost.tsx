import React, { useState } from 'react'
import styles from '@/styles/dashboard/applicant/job/jobPost.module.scss'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { JobBoard } from '@/util/Query/job.query'
import JobCard from './card'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import { filter, isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'


type Post = {
    jobPostID: string,
    title: string
    description: string
    duration: string
    location: string
    slug: string
    totalApplicant: number,
    endDate: any
    createdAt: any
    JobType: string[],
    salary: {
        min: number,
        max: number,
        fixed: number,
        currency: string
    }
    skills: {
        skills: string
        skillsID: any
    }
    getCompany: {
        companyName: string
        logo: {
            media: string,
            mediaID: string
        }
    }
}

export default function JobPost({ search, debounce, values }: any) {

    const itemsPerPage = 20;
    const [page, setPage] = useState(1)

    const { data, isLoading } = useQuery({
        queryKey: ["JobBoard", debounce, values],
        queryFn: async () => {
            const { getJobBoard } = await GraphQLRequest(JobBoard, {
                search: search,
                orderBy: "desc",
                jobType: values.jobType.length === 0 ? null : values.jobType,
                experience: values.experience.length === 0 ? null : values.experience,
                duration: values.duration.length === 0 ? null : values.duration,
                skills: values.skills,
                filter: "",
                input: {
                    take: itemsPerPage, page: page
                }
            })

            return getJobBoard
        }
    })


    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }
    return (
        <div className={styles.container}>
            {
                itemsPerPage >= data?.totalItems ?
                    null : <Pagination
                        itemsPerPage={itemsPerPage}
                        currentPage={data?.currentPage}
                        hasNextPage={data?.hasNextPage}
                        hasPrevPage={data?.hasPrevPage}
                        nextButton={NextPage}
                        prevButton={PrevPage}
                        totalItems={data?.totalItems}
                        totalPages={data?.totalPages}
                    />
            }
            {isEmpty(data?.item) ?
                <NotAvailable />
                : isLoading ? <Spinner /> :
                    <div className={styles.grid}>
                        {data?.item.map(({ jobPostID, title, description, slug, location, duration, totalApplicant, endDate, createdAt, JobType, salary: { min, max, fixed, currency }, skills: { skills, skillsID }, getCompany: { companyName, logo: { media, mediaID } } }
                            : Post) => (
                            <JobCard key={jobPostID}
                                title={title}
                                description={description}
                                slug={slug}
                                jobPostID={jobPostID}
                                duration={duration}
                                location={location}
                                totalApplicant={totalApplicant}
                                endDate={endDate}
                                createdAt={createdAt}
                                JobType={JobType}
                                salary={{
                                    min: min,
                                    max: max,
                                    fixed: fixed,
                                    currency: currency
                                }} skills={{
                                    skills: skills,
                                    skillsID: skillsID
                                }} getCompany={{
                                    companyName: companyName,
                                    logo: {
                                        media,
                                        mediaID
                                    }
                                }}
                            />
                        ))}
                    </div>
            }


        </div >
    )
}
