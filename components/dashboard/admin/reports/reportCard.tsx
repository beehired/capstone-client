import React from 'react'
import styles from '@/styles/dashboard/admin/report.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { Formatter } from '@/util/formatter';
import { TbEye } from 'react-icons/tb';
import { useRouter } from 'next/navigation'

export default function ReportCard({ title, JobPost, reportID, name, date }: any) {


    const router = useRouter();


    return (
        <div className={styles.tr}>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{title}</span>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{name}</span>
            </div>
            <div className={styles.td}>
                <span>
                    {Formatter(date)}
                </span>
            </div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <button aria-label="button" onClick={() => router.push(`/dashboard/admin/reports/${reportID}`)}>
                        <TbEye size={23} />
                    </button>
                </div>
            </div></div>
    )
}
