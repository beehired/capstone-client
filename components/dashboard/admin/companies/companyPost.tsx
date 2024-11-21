import React from 'react'
import parse from 'html-react-parser'
import styles from '@/styles/dashboard/admin/companies.job.module.scss'
import { RegularPoppins } from '@/components/typograhy'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'

export default function CompanyJobPost({ data }: any) {
    return (
        <div className={styles.container}>
            {isEmpty(data) ? <NotAvailable /> :
                data.map(({ jobPostID, title, description, duration, endDate, status, experience }: any) => (
                    <div key={jobPostID} className={styles.card}>
                        <h2 className={RegularPoppins.className}>{title}</h2>
                        <div className={styles.companies}>
                            <span>Duration: {duration}</span>
                            <span>End of Filling: {endDate}</span>
                            <span>Experiecne: {experience}</span>
                        </div>
                        <div>{parse(description.slice(0, 300))}</div>
                    </div>
                ))}
        </div>
    )
}