"use client"
import React, { useEffect, useMemo, useState } from 'react'
import styles from '@/styles/dashboard/applicant/job/slug.module.scss';
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetJobPostID } from '@/util/Query/job.query'
import { useQuery } from '@tanstack/react-query'
import { RegularPoppins } from '@/components/typograhy'
import parse from 'html-react-parser'
import Spinner from '@/components/spinner'
import SimilarJobs from './similarjobs/similar'
import Dialog from '@/components/dialog'
import ApplyNow from './apply'
import FavouriteButton from '@/components/favouriteButton';
import ReportButton from '@/components/reportButton';

export default function JobBody({ id }: any) {


    const [toggle, setToggle] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["JobPost", id],
        queryFn: async () => {
            const { getJobPostById } = await GraphQLRequest(GetJobPostID, {
                jobPostId: id
            })

            return getJobPostById
        }
    })


    const skillset = useMemo(() => {
        return [] as string[];
    }, []);

    useEffect(() => {
        data?.skills?.map(({ skills }: { skills: string }) => {
            skillset.push(skills)
        })
    }, [data?.skills, skillset])

    const onHandleApplyNow = () => {
        setToggle(() => !toggle)
    }
    return (
        <div className={styles.container}>
            {toggle ?
                <Dialog>
                    <ApplyNow close={onHandleApplyNow} jobPostId={id} />
                </Dialog>
                : null}

            <div className={styles.body}>
                {isLoading ? <Spinner /> :
                    <>
                        <div className={styles.header}>
                            <div className={styles.head}>
                                <div className={styles.asd}>

                                    <h2 className={RegularPoppins.className}>{data?.title}</h2> &#x2022;
                                    <span>{data?.location}</span>
                                </div>
                                <div className={styles.application}>
                                    <button aria-label="button" onClick={onHandleApplyNow} className={styles.applyNow}>
                                        <span className={RegularPoppins.className}>Apply Now</span>
                                    </button>
                                    <FavouriteButton size={23} jobPostId={id} />
                                    <ReportButton jobPostId={id} />
                                </div>
                            </div>
                            <div className={styles.hbody}>
                                <div className={styles.jobType}>
                                    {data?.JobType.map((jobType: any, index: number) => (
                                        <span key={index}>{jobType}</span>
                                    ))}
                                </div>
                                <div className={styles.skills}>
                                    {data?.skills.map(({ skills }: { skills: any }) => (
                                        <span key={skills}>{skills}</span>
                                    ))}
                                </div>
                                <div className={styles.info2}>
                                    <span>{data?.totalApplicant} Applied</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h2 className={RegularPoppins.className}>Job Description</h2>
                            {parse(`${data?.description}`)}
                        </div>
                    </>}
            </div>
            <div className={styles.similar}>
                <h2 className={RegularPoppins.className}>Similar Jobs</h2>
                <SimilarJobs skillsData={skillset} id={id} />
            </div>

        </div>
    )
}
