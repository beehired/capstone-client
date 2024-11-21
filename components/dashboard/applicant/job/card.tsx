"use client"
import React from 'react'
import styles from '@/styles/dashboard/applicant/job/card.module.scss'
import { formatDistance } from 'date-fns'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import FavouriteButton from '@/components/favouriteButton'


type Post = {
    jobPostID: string,
    title: string
    description: string
    duration: string
    location: string
    slug: string
    totalApplicant: number,
    endDate: any
    createdAt: any
    JobType: string[],
    salary: {
        min: number,
        max: number,
        fixed: number,
        currency: string
    }
    skills: {
        skills: string
        skillsID: any
    }
    getCompany: {
        companyName: string
        logo: {
            media: string
            mediaID: string
        }
    }
}

export default function JobCard({ jobPostID, title, description, slug, location, duration, totalApplicant, endDate, createdAt, JobType, salary: { min, max, fixed, currency }, skills: { skills, skillsID }, getCompany: { companyName, logo: { media, mediaID } } }: Post) {

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {!media ?
                        <span className={RegularPoppins.className}>{companyName[0]}</span>
                        : <Image src={media} alt="" height={80} width={80} priority />}
                </div>
                <div className={styles.info}>
                    <Link className={`${styles.title} ${RegularPoppins.className}`} href={`/freelancer/find-job/${jobPostID}`}>{title.length > 20 ? `${title.slice(0, 20)}...` : `${title}`}</Link>
                    <div className={styles.location}>
                        <span>{companyName}</span> &#x2022;
                        <span>{location}</span>
                    </div>
                </div>
            </div>      
            <div className={styles.description}>
                {parse(description.slice(0, 160))}
            </div>
            <div className={styles.footer}>
                <div className={styles.f1}>
                    <span>{formatDistance(new Date(Date.now()), new Date(createdAt), { addSuffix: true })}</span> &#x2022; {" "}
                    <span className={`${MediumPoppins.className}`}>{totalApplicant} Applied</span>
                </div>
                <FavouriteButton size={23} jobPostId={jobPostID} />
            </div>

        </div>
    )
}
