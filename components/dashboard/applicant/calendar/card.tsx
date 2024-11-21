"use client"

import React from 'react'
import styles from '@/styles/dashboard/applicant/applicantCalendar.module.scss'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetScheduleByReceiverId } from '@/util/Query/schedule.query'
import { format } from 'date-fns'
import store from 'store2'
import NotAvailable from '@/components/notavailable'
import { isEmpty } from 'lodash'
import ScheduleCard from '../../calendar/scheduleCard'


export default function Card({ date }: any) {

    const user = store.get("UserAccount");


    const { data } = useQuery({
        queryKey: ["CalendarDate", date.toISOString()],
        queryFn: async () => {
            const { getReceiverByDate } = await GraphQLRequest(GetScheduleByReceiverId, {
                date: `${format(new Date(date.toISOString()), "yyyy-MM-dd")}`,
                userId: user?.id
            })

            return getReceiverByDate
        }
    })
    return (
        <div className={styles.calendarBox}>
            <div>

            </div>
            <div className={styles.boxHeader}>
                {date.date()}
            </div>
            <div className={styles.boxBody}>
                {isEmpty(data) ? "" : data?.map(({ scheduleID, title, startDate, endDate, description, link }: {
                    scheduleID: string, title: string, startDate: any, endDate: any, description: string, link: string
                }) => (
                    <ScheduleCard key={scheduleID} id={scheduleID} title={title} />
                ))}</div>
        </div>
    )
}
