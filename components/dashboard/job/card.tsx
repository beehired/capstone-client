import React from 'react'
import styles from '@/styles/dashboard/job/card.module.scss'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { format } from 'date-fns'
import { TbCalendar, TbUser } from 'react-icons/tb'
import Link from 'next/link'
import parser from 'html-react-parser'

type Post = {
    id: string,
    name: string
    experience: string
    description: string
    endofdate: any
    applicants: number,
    slug: string,
    archive: boolean
}
export default function JobPostCard({ id, name, experience, description, endofdate, applicants, slug, archive }: Post) {


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link className={`${styles.h1} ${MediumPoppins.className}`} href={archive ? `/dashboard/employer/archive/jobs?id=${id}` : `/dashboard/employer/jobs/post?id=${id}`}>{name.length >= 20 ? `${name.slice(0, 20)}...` : name}</Link>
            </div>
            <div className={styles.subheader}>
                <span className={RegularPoppins.className}>{experience}</span>
            </div>
            <div className={styles.body}>
                {parser(description.slice(0, 100))}
            </div>
            <div className={styles.footer}>
                <div>
                    <span>End of Filing: </span>
                    <span className={RegularPoppins.className}>{format(new Date(endofdate), "MMM dd, yyyy")}</span>
                </div>
            </div>
        </div>
    )
}
