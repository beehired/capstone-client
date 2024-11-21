import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/applicant/job/filterTab.module.scss'
import { RegularPoppins } from '@/components/typograhy'


interface Props {
    title: string
    children: ReactNode
}

export default function FilterContainer({ title, children }: Props) {
    return (
        <div className={styles.tab}>
            <h2 className={RegularPoppins.className}>{title}</h2>
            <div>
                {children}
            </div>
        </div>
    )
}
