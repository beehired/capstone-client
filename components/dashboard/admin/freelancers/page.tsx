"use client"

import React, { useState, ChangeEvent } from 'react'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllUsersByRole } from '@/util/Query/user.query'
import { useQuery } from '@tanstack/react-query'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import styles from '@/styles/dashboard/admin/freelance.module.scss'
import FreelanceCard from './freelanceCard'
import Pagination from '@/components/pagination'
import { TbSearch } from 'react-icons/tb'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'


export default function FreelancerList() {

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [isVerified, setIsVerified] = useState(true);
    const itemsPerPage = 20;

    const { data } = useQuery({
        queryKey: ["Freelancers", search, isVerified, page],
        queryFn: async () => {
            const { getAllUserAccountByRole } = await GraphQLRequest(GetAllUsersByRole, {
                role: "freelance",
                search,
                input: {
                    take: itemsPerPage,
                    page: page
                },
                verified: isVerified
            })

            return getAllUserAccountByRole
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
                            <span className={MediumPoppins.className}>Avatar</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Email</span>
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
                    {isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ userID, email, verified, myProfile: { firstname, lastname, avatar } }: any) => (
                        <FreelanceCard key={userID} name={`${firstname} ${lastname}`} userID={userID} verified={verified} email={email} avatar={avatar?.media} />
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
        </div >
    )
}
