"use client"

import React, { useState, ChangeEvent } from 'react'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllCompanies } from '@/util/Query/company'
import { useQuery } from '@tanstack/react-query'
import Pagination from '@/components/pagination'
import styles from '@/styles/dashboard/admin/companies.module.scss';
import Search from '../../search'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import CompanyCard from './companyCard'
import { TbSearch } from 'react-icons/tb'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'

export default function CompaniesList() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const [search, setSearch] = useState("");
    const [isVerified, setIsVerified] = useState(true);

    const { data } = useQuery({
        queryKey: ["GetAllCompaniesList", search, isVerified, page],
        queryFn: async () => {
            const { getAllCompanies } = await GraphQLRequest(GetAllCompanies, {
                input: {
                    take: itemsPerPage,
                    page: page
                },
                search,
                verified: isVerified
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
                <select onChange={(e) => {
                    switch (e.target.value) {
                        case "true":
                            setIsVerified(true);
                            break;
                        case "false":
                            setIsVerified(false);
                            break;
                        default:
                            setIsVerified(false)
                            break;
                    }
                }}>
                    <option value="true" className={RegularPoppins.className}>Verified</option>
                    <option value="false" className={RegularPoppins.className}>Not Verified</option>
                </select>
                <div className={styles.searchContainer}>
                    <TbSearch size={23} />
                    <input type="Search" placeholder='Search here...' onChange={onHandleChange} />
                </div>

            </div>
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Email Address</span>
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
                    {isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ companyID, companyName, companySize, getJobPostCount, slug, logo: { media }, verified, user: { email, plan } }:
                        { companyID: string, companyName: string, companySize: string, getJobPostCount: number, slug: string, logo: { media: string }, verified: boolean, user: any }
                    ) => (
                        <CompanyCard key={companyID} companyName={companyName} companySize={companySize} getJobPostCount={getJobPostCount} slug={slug} verified={verified} media={media} plan={plan} email={email} />
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
