"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/schedule/card.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import Dialog from '@/components/dialog';
import ScheduleView from './scheduleView';

export default function ScheduleCard({ id, title }: { id: string, title: string }) {


    const [scheduleView, setScheduleView] = useState(false);

    const onHandleViewSchedule = () => {
        setScheduleView(() => !scheduleView)
    }
    return (
        <div className={styles.container}>
            {
                scheduleView &&
                <Dialog>
                    <ScheduleView id={id} close={onHandleViewSchedule} />
                </Dialog>
            }
            <h2 onClick={onHandleViewSchedule} className={`${RegularPoppins.className} ${styles.title}`}>{title}</h2>
        </div>
    )
}
