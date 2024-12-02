import React from 'react'
import { AStatus } from '@/util'
import styles from '@/styles/dashboard/applicant/applications/applicationTab.module.scss'
import { RegularPoppins } from '@/components/typograhy'



export default function ApplicationTab({ click, value }: any) {
    return (
        <div className={styles.container}>
            {AStatus.map((applicantStatus) => (
                <button aria-label={applicantStatus} onClick={click} key={applicantStatus} value={applicantStatus} className={applicantStatus === value ? `${styles.active} ${RegularPoppins.className}` : `${RegularPoppins.className}`}>{applicantStatus}
                </button>
            ))
            }
        </div >
    )
}
