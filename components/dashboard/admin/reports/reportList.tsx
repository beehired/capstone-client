"use client"
import Pagination from '@/components/pagination'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllReport } from '@/util/Query/report.query'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import styles from '@/styles/dashboard/admin/report.module.scss';
import { MediumPoppins } from '@/components/typograhy'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'
import ReportCard from './reportCard'


export default function ReportList() {


    const itemsPerPage = 20;
    const [page, setPage] = useState(1)

    const { data } = useQuery({
        queryKey: ["ReportQuery"],
        queryFn: async () => {
            const { getAllJobPostReport } = await GraphQLRequest(GetAllReport, {
                input: {
                    take: itemsPerPage,
                    page
                },
            })

            return getAllJobPostReport
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
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Title</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Reported By</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Date Created</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Action</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {
                        isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ reportID, message, jobPost, user, createdAt }: any) => (
                            <ReportCard key={reportID} reportID={reportID} title={message} jobPost={jobPost} name={`${user.myProfile?.firstname} ${user.myProfile.lastname}`} date={createdAt} />
                        ))
                    }
                </div>
            </div>

            <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={data?.currentPage}
                hasNextPage={data?.hasNextPage}
                hasPrevPage={data?.hasPrevPage}
                totalItems={data?.totalItems}
                totalPages={data?.totalPages} />

        </div>
    )
}
