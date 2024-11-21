"use client"


import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/education.module.scss';
import Spinner from '@/components/spinner';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { GetEducationByProfileID } from '@/util/Query/eduication.query';
import EducationCard from '../module/education.card';
import NotAvailable from '@/components/notavailable';


interface Education {
    educationID: string
    degree: string
    endMonth: string
    endYear: string
    school: string
    startMonth: string
    startYear: string
    study: string
}

export default function Education({ id }: { id: string }) {


    const { data, isLoading } = useQuery({
        queryKey: ["EducationBackgroud", id],
        queryFn: async () => {
            const { getAllEducationByProfileId } = await GraphQLRequest(GetEducationByProfileID, { profileId: id })

            return getAllEducationByProfileId
        }
    })

    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> :
                <div className={styles.grid}>
                    {isEmpty(data) ?
                        <NotAvailable /> :
                        data.map(({ educationID, degree, endMonth, endYear, school, startMonth, startYear, study }: Education) => (
                            <EducationCard key={educationID} educationID={educationID} degree={degree} endMonth={endMonth} endYear={endYear} school={school} startMonth={startMonth} startYear={startYear} study={study} />
                        ))}
                </div>
            }
        </div>
    )
}
