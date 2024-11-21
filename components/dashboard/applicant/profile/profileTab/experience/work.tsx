"use client"

import styles from '@/styles/dashboard/applicant/profile/work.module.scss'
import React from 'react'
import Spinner from '@/components/spinner'
import WorkCard from '../module/work.card'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { RegularPoppins } from '@/components/typograhy'
import { GetMyPortfolioByProfileId } from '@/util/Query/portoflio.query'
import NotAvailable from '@/components/notavailable'


interface Props {
    portfolioID: string
    title: string
    description: string
    companyName: string
    location: string
    employmentType: string
    locationType: string
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
    skills: any,
    createdAt: any
}


export default function WorKExperience({ id }: { id: string }) {

    const { data, isLoading } = useQuery({
        queryKey: ["WorkExperience", id],
        queryFn: async () => {
            const { getPortfolioByProfileID } = await GraphQLRequest(GetMyPortfolioByProfileId, {
                profileId: id
            })

            return getPortfolioByProfileID
        }
    })
    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> :
                <div className={styles.grid}>
                    {isEmpty(data) ?
                        <NotAvailable />
                        : data.map(({ portfolioID, title, description, companyName, location, startMonth, startYear, endMonth, endYear, createdAt, employmentType, locationType, skills }: Props) => (
                            <WorkCard key={portfolioID} title={title} description={description} companyName={companyName} location={location} startMonth={startMonth} startYear={startYear} endMonth={endMonth} endYear={endYear} createdAt={createdAt} employmentType={employmentType} locationType={locationType} portfolioID={portfolioID} skills={skills} />
                        ))
                    }
                </div>}
        </div >
    )
}
