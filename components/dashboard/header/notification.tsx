"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ButtonIconToggle, } from '@/components/button'
import { TbBell, TbChecks } from 'react-icons/tb'
import styles from '@/styles/components/notification.module.scss'
import { RegularPoppins } from '@/components/typograhy'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import store from 'store2'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllNotificationByUserID, GetUnreadNotification } from '@/util/Query/notification.query'
import NotificationCard from './notificationCard'
import { MarkAllAsRead } from '@/util/Mutation/notification.mutation'
import { queryClient } from '@/lib/provider'
import { isEmpty } from 'lodash'


const Notification = () => {

    const user = store.get("UserAccount");
    const [toggle, setToggle] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['notification', user?.id],
        queryFn: async ({ pageParam }) => {
            const { getNotificationByUserID } = await GraphQLRequest(GetAllNotificationByUserID, {
                userId: user?.id,
                limit: 30,
                cursor: pageParam,
            })
            return getNotificationByUserID
        },
        getNextPageParam: (lastPage) => lastPage.getNotificationByUserID?.nextCursor,
        initialPageParam: null,
        refetchInterval: 1000
    })

    const { data: UnreadNotifData } = useQuery({
        queryKey: ["unread", user?.id],
        queryFn: async () => {
            const { unreadNotification } = await GraphQLRequest(GetUnreadNotification, {
                userId: user?.id
            })
            return unreadNotification
        },
        refetchInterval: 1000
    })

    const mutation = useMutation({
        mutationKey: ["MarkAllAsRead"],
        mutationFn: async () => {
            return await GraphQLRequest(MarkAllAsRead, {
                userId: user?.id
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification"]
            })
        }
    })


    useEffect(() => {
        const onHandleClickOutSide = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setToggle(false)
            }
        }

        document.addEventListener('mousedown', onHandleClickOutSide);


        return () => {
            document.removeEventListener('mousedown', onHandleClickOutSide)
        }
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.po}>
                <ButtonIconToggle icon={<TbBell size={30} />} value={toggle} setValue={setToggle} />
                {UnreadNotifData ? <div className={styles.notificationActive} /> : null}
            </div>
            {toggle ?
                <div ref={divRef} className={styles.notificationContainer}>
                    <div className={styles.notificationHeader}>
                        <h2 className={RegularPoppins.className}>Notifications</h2>
                        <button aria-label="button" onClick={() => {
                            mutation.mutate()
                        }}>
                            <TbChecks size={23} />
                            <span className={RegularPoppins.className}>Mark all as read</span>
                        </button>
                    </div>
                    <div className={styles.notificationBody}>
                        {data?.pages[0].notification.map(({ notificationID, title, read, createdAt, company, application, schedule }: any) => (
                            <NotificationCard status={read} key={notificationID} notificationID={notificationID} title={title} date={createdAt} application={application} company={company[0]} schedule={schedule} />
                        ))}
                    </div>
                </div> :
                null
            }

        </div>
    )
}


export default Notification;