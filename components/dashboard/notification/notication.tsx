"use client";

import { GraphQLRequest } from '@/lib/graphQLRequest';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import store from 'store2';
import NotificationCard from './notificationCard';
import styles from '@/styles/dashboard/sidebar/notification.module.scss'
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import { GetAllNotificationByUserID } from '@/util/Query/notification.query';
export default function NotificationPage() {

    const user = store.get("UserAccount");

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["GetNotificationByCompanyId"],
        queryFn: async ({ pageParam }) => {
            const { getNotificationByUserID } = await GraphQLRequest(GetAllNotificationByUserID, {
                userId: user?.id,
                limit: 10,
                cursor: pageParam,
            })

            return getNotificationByUserID
        },
        getNextPageParam: (lastPage) => lastPage.getNotificationByUserID?.nextCursor,
        initialPageParam: null,
        refetchInterval: 1000
    })

    return (
        <div className={styles.container}>
            {isEmpty(data?.pages[0].notification) ? <NotAvailable /> : data?.pages[0].notification.map(({ notificationID, title, read, createdAt, company, application, schedule, jobPost }: any) => (
                <NotificationCard
                    status={read}
                    key={notificationID}
                    notificationID={notificationID}
                    title={title}
                    date={createdAt}
                    application={application}
                    company={company[0]}
                    schedule={schedule}
                />
            ))}
        </div>
    )
}
