"use client"


import React, { useState } from 'react'
import styles from '@/styles/dashboard/review/review.module.scss';
import store from 'store2';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetAllCompanieReview } from '@/util/Query/review.query';
import Pagination from '@/components/pagination';
import { RegularPoppins } from '@/components/typograhy';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import ReviewCard from './reviewCard';

export default function Review() {

    const user = store.get("UserAccount");
    const itemsPerPage = 20;
    const [page, setPage] = useState(1)

    const { data } = useQuery({
        queryKey: ["GetCompaniesReview"],
        queryFn: async () => {
            const { getAllCompanyReview } = await GraphQLRequest(GetAllCompanieReview, {
                input: {
                    take: itemsPerPage,
                    page: page
                },
                companyId: user?.user?.company.companyID
            })

            return getAllCompanyReview
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
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Rating</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Review</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Action</div>
                    </div>
                </div>{isEmpty(data?.item) ? <NotAvailable /> :
                    <div className={styles.tbody}>
                        {data?.item.map(({ review, rating, reviewID }: any) => (
                            <ReviewCard key={reviewID} rating={rating} reviewID={reviewID} review={review} />
                        ))}
                    </div>
                }
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={data?.currentPage}
                hasNextPage={data?.hasNextPage}
                hasPrevPage={data?.hasPrevPage}
                totalItems={data?.totalItems}
                totalPages={data?.totalPages}
            />
        </div>
    )
}
