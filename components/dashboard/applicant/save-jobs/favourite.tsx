"use client"


import React from 'react'
import styles from '@/styles/dashboard/applicant/save-jobs/favourite.module.scss'
import { useQuery } from '@tanstack/react-query'
import store from 'store2'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetMyFavouriteSaveJobs } from '@/util/Query/favourite.query'
import JobCard from '../job/card'
import Spinner from '@/components/spinner'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'

export default function Favourite() {


    const user = store.get("UserAccount")

    const { data, isLoading } = useQuery({
        queryKey: ["GetAllMyFavourites"],
        refetchInterval: 1000,
        queryFn: async () => {
            const { getAllMySaveJobs } = await GraphQLRequest(GetMyFavouriteSaveJobs, {
                userId: user?.id

            })
            return getAllMySaveJobs
        }
    })
    return (
        <div className={styles.container}>
            <h2>Save Jobs</h2>
            {isEmpty(data) ? <NotAvailable /> : null}
            <div className={styles.grid}>
                {isLoading ? <Spinner /> : data?.map(({ favouriteID, jobPost }: { favouriteID: string, jobPost: any }) => (
                    <JobCard key={favouriteID} title={jobPost.title} description={jobPost.description} skills={jobPost.skills} JobType={jobPost.jobType} createdAt={jobPost.createdAt} duration={jobPost.duration} endDate={jobPost.endDate} getCompany={jobPost.getCompany} jobPostID={jobPost.jobPostID} location={jobPost.location} salary={jobPost.salary} slug={jobPost.slug} totalApplicant={jobPost.totalApplicant}
                    />
                ))}
            </div>
        </div>
    )
}
