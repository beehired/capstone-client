"use client"

import React, { useState, ChangeEvent } from 'react'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllCompanies } from '@/util/Query/company'
import { useQuery } from '@tanstack/react-query'
import Pagination from '@/components/pagination'
import styles from '@/styles/dashboard/admin/companies.module.scss';
import Search from '../../search'
import { MediumPoppins } from '@/components/typograhy'
import CompanyCard from './companyCard'

export default function CompaniesList() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const [search, setSearch] = useState("");

    const { data } = useQuery({
        queryKey: ["GetAllCompaniesList", search],
        queryFn: async () => {
            const { getAllCompanies } = await GraphQLRequest(GetAllCompanies, {
                input: {
                    take: itemsPerPage,
                    page: page
                },
                search
            })

            return getAllCompanies
        }
    })

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Search onChange={onHandleChange} />
            </div>
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Logo</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Size</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Plan</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Job Post Count</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Verified</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Actions</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {data?.item.map(({ companyID, companyName, companySize, getJobPostCount, slug, logo: { media }, verified, user: { plan } }:
                        { companyID: string, companyName: string, companySize: string, getJobPostCount: number, slug: string, logo: { media: string }, verified: boolean, user: any }
                    ) => (
                        <CompanyCard key={companyID} companyName={companyName} companySize={companySize} getJobPostCount={getJobPostCount} slug={slug} verified={verified} media={media} plan={plan} />
                    ))}
                </div>
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
