"use client"

import React from 'react'
import styles from '@/styles/dashboard/applicant/job/filter2.module.scss'
import { RegularPoppins } from '@/components/typograhy'

export default function Filter({ onHandleFilter, filters }: any) {

    const filter = ["Best Match", "Most Recent", "Featured"]
    return (
        <div className={styles.container}>
            {filter.map((post) => (
                <button key={post} value={post} onClick={onHandleFilter} className={post === filters ? `${styles.active} ${RegularPoppins.className}` : `${RegularPoppins.className}`}>{post}</button>
            ))}
        </div>
    )
}
