"use client"

import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import styles from '@/styles/dashboard/job/body.module.scss';
import Pagination from '@/components/pagination';
import store from 'store2';
import JobPostCard from './card';
import { GetMyJobPostPagination } from '@/util/Query/job.query'
import { useQuery } from '@tanstack/react-query';
import { RegularPoppins } from '@/components/typograhy';
import { isEmpty } from 'lodash'
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { useDebounce } from '@uidotdev/usehooks';
import { Rings } from 'react-loader-spinner';
import { TbSearch } from 'react-icons/tb';
import { RouteButtonV1, RouteButtonV2 } from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';
import NotAvailable from '@/components/notavailable';

export default function JobBody() {

    const user = store.get("UserAccount")
    const searchParams = useSearchParams();
    const router = useRouter();
    const itemsPerPage = 20;
    const [search, setSearch] = useState("");
    const debounceSearchTerm = useDebounce(search, 100);

    const [searchQueryParams, setSearchQueryParams] = useState(false)

    useEffect(() => {
        switch (searchParams.get("archive")) {
            case "true":
                setSearchQueryParams(true);
                break;
            case "false":
                setSearchQueryParams(false);
                break;
            default:
                setSearchQueryParams(false);
                break;
        }
    }, [searchParams])

    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: useMemo(() => ["JobPosts", debounceSearchTerm, searchQueryParams, user?.id], [debounceSearchTerm, searchQueryParams, user?.id]),
        queryFn: async () => {
            const { jobPagination } = await GraphQLRequest(GetMyJobPostPagination, {
                userId: user?.id,
                search,
                pagination: {
                    take: itemsPerPage,
                    page: page
                },
                archive: searchQueryParams
            })

            return jobPagination
        },
    })

    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }

    const onHandleSearchJob = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.first}>
                    <button aria-label="button"
                        onClick={() => router.push(`/dashboard/employer/jobs?archive=false`)}
                        className={searchParams.get("archive") === "false" ? `${styles.active}` : ""}>
                        <span className={RegularPoppins.className}>All Job</span>
                    </button>
                    <button
                        aria-label="button"
                        onClick={() => router.push(`/dashboard/employer/jobs?archive=true`)}
                        className={searchParams.get("archive") === "true" ? `${styles.active}` : ""}>
                        <span className={RegularPoppins.className}>Archive</span>
                    </button>
                </div>
                <div className={styles.second}>
                    <div className={styles.search}>
                        <TbSearch size={20} />
                        <input aria-label='seach' type='search' placeholder='Search' onChange={onHandleSearchJob} />
                    </div>
                    <RouteButtonV1 name='Add New' url='/dashboard/employer/jobs/create' />
                </div>
            </div>

            <div className={styles.bg}>
                {
                    isEmpty(data?.item) ?
                        <NotAvailable />
                        :
                        <div className={styles.jobs}>
                            {
                                isLoading ? <Rings /> : data?.item.map(({ jobPostID, title, description, experience, slug, isArchive, totalApplication, endDate }: any) => (
                                    <JobPostCard key={jobPostID} id={jobPostID} name={title} description={description} endofdate={endDate} applicants={totalApplication} experience={experience} slug={slug} archive={isArchive} />
                                ))
                            }
                        </div>
                }
            </div>
            {
                itemsPerPage < data?.totalItems ? <Pagination
                    itemsPerPage={itemsPerPage}
                    nextButton={NextPage}
                    prevButton={PrevPage}
                    currentPage={data?.currentPage}
                    hasNextPage={data?.hasNextPage}
                    hasPrevPage={data?.hasPrevPage}
                    totalItems={data?.totalItems}
                    totalPages={data?.totalPages}
                /> : null
            }
        </div >
    )
}
