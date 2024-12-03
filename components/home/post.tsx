"use client"
import React from 'react'
import styles from '@/styles/components/home/post.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetAllJobPost } from '@/util/Query/job.query';
import Spinner from '../spinner';
import { RegularPoppins } from '../typograhy';
import parse from 'html-react-parser'
import Image from 'next/image'
export default function Post() {


    const { data, isLoading } = useQuery({
        queryKey: ["GetAllJobPost"],
        queryFn: async () => {
            return await GraphQLRequest(GetAllJobPost, {
                input: {
                    take: 12,
                    page: 1
                }
            })
        }
    })
    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> : data?.getAllJobPost.map(({ jobPostID, location, title, description, JobType, getCompany: { logo: { media } } }: any) => (
                <div className={styles.jobPostCard} key={jobPostID}>
                    <div className={styles.header}>
                        <Image src={media} alt="" height={80} width={80} />
                        <div>
                            <h2 className={RegularPoppins.className}>{title.length > 20 ? `${title.slice(0, 20)}...` : `${title}`}</h2>
                            <span>{location}</span>
                        </div>
                    </div>
                    <div>
                        {parse(description.slice(0, 300))}
                    </div>
                </div>
            ))}
        </div>
    )
}
