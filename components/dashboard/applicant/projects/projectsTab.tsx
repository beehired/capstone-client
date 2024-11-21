import React from 'react'
import styles from '@/styles/dashboard/applicant/project/projecTab.module.scss'
import { RegularPoppins } from '@/components/typograhy'
import { PStatus } from '@/util'


export default function ProjectTabs({ click, value }: any) {
    return (
        <div className={styles.container}>
            {PStatus.map((ProjectStatus) => (
                <button value={ProjectStatus} onClick={click} className={ProjectStatus === value ? `${styles.active} ${RegularPoppins.className}` : `${RegularPoppins.className}`} key={ProjectStatus}>
                    {ProjectStatus}
                </button>
            ))}
        </div>
    )
}
