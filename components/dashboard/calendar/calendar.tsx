"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/calendar.module.scss'
import { generateDate, months } from './calendar.config'
import dayjs from 'dayjs'
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb'
import { RegularPoppins } from '../../typograhy'
import { format } from 'date-fns'
import CalendarCard from './card'

function Calendar() {

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);

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
            <div className={styles.asdxd}>
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) =>
                    <CalendarCard key={index} date={date} />
                )}
            </div>
        </div>
    )
}



function MiniCalendar({ onSelected, name, setValue }: any) {

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate)
    return (
        <div className={styles.miniCalendar}>
            <div className={styles.months}>
                <button aria-label="button" type="button" onClick={() => setToday(today.month(today.month() - 1))}>
                    <TbChevronLeft size={23} />
                </button>
                <span className={RegularPoppins.className}>{months[today.month()]}</span>
                <button aria-label="button" type="button" onClick={() => setToday(today.month(today.month() + 1))}>
                    <TbChevronRight size={23} />
                </button>
            </div>
            <div className={styles.daysInMonth}>
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                    <div className={styles.days} key={index}>
                        <button aria-label="button" onClick={(e) => {
                            onSelected(name, e.currentTarget.value)
                            setValue(false)
                        }} value={format(new Date(date.toDate()), "MMMM dd, yyyy")} type="button" className={today ? `${styles.isActive}` : ''}
                        >
                            <span className={RegularPoppins.className}>{date.date()}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div >
    )
}


export { Calendar, MiniCalendar }