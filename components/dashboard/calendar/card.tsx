"use client"

import React from 'react'
import styles from '@/styles/dashboard/calendar.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetScheduleByDate } from '@/util/Query/schedule.query'
import { format } from 'date-fns'
import store from 'store2';
import ScheduleCard from './scheduleCard';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';


const day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

export default function CalendarCard({ date }: any) {


    const user = store.get("UserAccount");

    const { data } = useQuery({
        queryKey: ["CalendarDate", date.toISOString()],
        queryFn: async () => {
            const { getScheduleByDate } = await GraphQLRequest(GetScheduleByDate, {
                date: `${format(new Date(date.toISOString()), "yyyy-MM-dd")}`,
                userId: user?.id
            })

            return getScheduleByDate
        }
    })

    return (
        <div className={styles.days}>
            <div className={styles.as}>
                <span className={RegularPoppins.className}>{day[date.day()]} {date.date()}</span>
                <div className={styles.grid}>
                    {isEmpty(data) ? <NotAvailable /> : data?.map(({ scheduleID, title, startDate, endDate, description, link }: {
                        scheduleID: string, title: string, startDate: any, endDate: any, description: string, link: string
                    }) => (
                        <ScheduleCard key={scheduleID} id={scheduleID} title={title} />
                    ))}
                </div>
            </div>
        </div>
    )
}
