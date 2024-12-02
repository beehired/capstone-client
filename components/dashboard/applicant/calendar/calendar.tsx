"use client";

import React, { useState } from 'react'
import styles from '@/styles/dashboard/applicant/applicantCalendar.module.scss'
import dayjs from 'dayjs'
import { RegularPoppins } from '@/components/typograhy';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { generateDate, months } from '../../calendar/calendar.config';
import { useQuery } from '@tanstack/react-query';
import Card from './card';





export default function Calendar() {

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);

    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2 className={`${RegularPoppins.className} ${styles.date}`}>{months[today.month()]} {today.year()} </h2>
                </div>
                <div className={styles.btnGrp}>
                    <button aria-label="button" onClick={() => setToday(today.month(today.month() - 1))} className={styles.leftBtn}>
                        <TbChevronLeft size={18} />
                    </button>
                    <button aria-label="button" onClick={() => setToday(today.month(today.month() + 1))} className={styles.rightBtn}>
                        <TbChevronRight size={18} />
                    </button>
                </div>
            </div>
            <div className={styles.headerDay}>
                {day.map((days, index) => (
                    <div key={index}>
                        <span>{days}</span>
                    </div>
                ))}
            </div>
            <div className={styles.body}>


                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) =>
                    <Card key={index} date={date} />
                )}
            </div>
        </div >
    )
}
