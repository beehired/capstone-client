"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/applicant/applications/application.module.scss';
import dynamic from 'next/dynamic'
import store from 'store2';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyApplication } from '@/util/Query/application.query';
import Image from 'next/image'
import parse from 'html-react-parser'
import Pagination from '@/components/pagination';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import { RegularPoppins } from '@/components/typograhy';

const ApplicationTab = dynamic(() => import("./applicationTab"), {
    ssr: false
})

export default function Applications() {

    const user = store.get("UserAccount");
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const [value, setValue] = useState("Pending")

    const onHandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const { data } = useQuery({
        queryKey: ["GetMyApplication", user?.id, value],
        queryFn: async () => {
            const { getMyApplication } = await GraphQLRequest(GetMyApplication, {
                userId: user?.id,
                input: {
                    take: 20,
                    page: 1
                },
                status: value
            })

            return getMyApplication
        }
    })


    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }
    return (
        <div className={styles.container}>
            <h2 className={RegularPoppins.className}>My Applications</h2>
            <ApplicationTab click={onHandleChangeValue} value={value} />
            <div className={styles.applications}>
                {isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ id, jobPost: { title, description, JobType, isOpen, duration, location, experience, getCompany: { companyName, logo: { media } } } }: any) => (
                    <div key={id} className={styles.applicationCard}>
                        <div className={styles.header}>
                            <div className={styles.avatar}>
                                <Image src={media} alt="" fill objectFit='cover' objectPosition='center' />
                            </div>
                            <div className={styles.job}>
                                <h2>{title}</h2>
                                <span>{companyName}  &#x2022; {location}</span>
                            </div>
                        </div>
                        <div className={styles.otherinfo}>
                            <span>{experience}  &#x2022;</span>

                            <span>{duration}  &#x2022;</span>
                            <div className={styles.jobType}>
                                {JobType.map((jobType: string, index: number) => (
                                    <span key={index}>{jobType}</span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.description}>
                            {parse(description.slice(0, 300))}
                        </div>
                    </div>
                ))}
                {data?.item.length < itemsPerPage ? null : <Pagination
                    currentPage={data?.currentPage}
                    hasNextPage={data?.hasNextPage}
                    hasPrevPage={data?.hasPrevPage}
                    itemsPerPage={itemsPerPage}
                    nextButton={NextPage}
                    prevButton={PrevPage}
                    totalItems={data?.totalItems}
                    totalPages={data?.totalPages}
                />}
            </div>

        </div>
    )
}
