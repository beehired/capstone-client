"use client"
import React, { useState } from 'react'
import { TbFlag, TbFlag2 } from 'react-icons/tb'
import Dialog from './dialog'
import Report from './dashboard/applicant/job/report'
import styles from '@/styles/dashboard/applicant/job/slug.module.scss'



export default function ReportButton({ jobPostId }: { jobPostId: string }) {


    const [toggle, setToggle] = useState(false);


    const onHandleReportBtn = () => {
        setToggle(() => !toggle)
    }

    return (
        <div>
            {toggle ?
                <Dialog>
                    <Report close={onHandleReportBtn} jobPostId={jobPostId} />
                </Dialog> : null
            }
            <button className={styles.reportBtn} onClick={onHandleReportBtn}>

                <TbFlag size={23} />
            </button>
        </div>
    )
}
