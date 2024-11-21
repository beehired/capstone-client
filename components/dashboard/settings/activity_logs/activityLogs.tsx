"use client"


import React, { useState } from 'react'
import styles from '@/styles/dashboard/settings/activity_logs.module.scss';
import store from 'store2';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyActivityLogs } from '@/util/Query/activity_logs.query';
import Pagination from '@/components/pagination';
import { RegularPoppins } from '@/components/typograhy';
import Spinner from '@/components/spinner';
import { format } from 'date-fns';

export default function ActivityLogs() {


    const user = store.get("UserAccount");
    const itemsPerPage = 10
    const [page, setPage] = useState(1)

    const { data, isLoading } = useQuery({
        queryKey: ["MyActivityLogs", user?.id, page],
        queryFn: async () => {
            const { getUserActivityLogs } = await GraphQLRequest(GetMyActivityLogs, {
                userId: user?.id,
                input: {
                    take: itemsPerPage,
                    page: page
                }
            })

            return getUserActivityLogs
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
                {isLoading ? <Spinner /> :
                    data?.item.map(({ logsID, title, description, createdAt }: any) => (
                        <div className={styles.card} key={logsID}>
                            <div>
                                <h2 className={RegularPoppins.className}>{title}</h2>
                                <span>{description}</span>
                            </div>
                            <span className={styles.date}>{format(new Date(createdAt), "MMM dd, yyyy")}</span>
                        </div>
                    ))}
            </div>
            {itemsPerPage <= data?.totalItems ? <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={data?.currentPage}
                hasNextPage={data?.hasNextPage}
                hasPrevPage={data?.hasPrevPage}
                totalItems={data?.totalItems}
                totalPages={data?.totalPages}
            /> : null}
        </div>
    )
}
