import React from 'react'
import parse from 'html-react-parser'
import styles from '@/styles/dashboard/job/review.module.scss';
import { format, isValid } from 'date-fns'
import { RegularPoppins, MediumPoppins } from '@/components/typograhy';

type JobReviewProps = {
    title: string,
    description: string,
    employment: string,
    location: string,
    duration: string,
    jobType: string[],
    skills: string[],
    fixed: boolean,
    currency: string,
    salary: number,
    min: number, max: number
}

export default function JobReview({ title, description, employment, location, duration, jobType, skills, fixed, currency, salary, min, max }: JobReviewProps) {


    return (
        <div className={styles.container}>
            <div>
                <span className={`${RegularPoppins.className} ${styles.title}`}>Title: </span>
                <span className={RegularPoppins.className}>{title}</span>
            </div>
            <div>
                <span className={`${RegularPoppins.className} ${styles.title}`}>Job Type: </span>
                {jobType.map((jobType) => (
                    <span key={jobType}>{jobType}</span>
                ))}
            </div>
            <div className={styles.description}>
                <h2 className={`${RegularPoppins.className} ${styles.title}`}>Description: </h2>
                {parse(description)}
            </div>
            <div>
                <span className={`${RegularPoppins.className} ${styles.title}`}>Employment: </span>
                <span>{employment}</span>
            </div>

            <div>
                <span className={`${RegularPoppins.className} ${styles.title}`}>Location: </span>
                <span>{location}</span>
            </div>


            <div>

            </div>
        </div >
    )
}
