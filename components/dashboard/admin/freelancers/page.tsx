"use client"

import React, { useState, ChangeEvent } from 'react'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllUsersByRole } from '@/util/Query/user.query'
import { useQuery } from '@tanstack/react-query'
import { MediumPoppins } from '@/components/typograhy'
import styles from '@/styles/dashboard/admin/freelance.module.scss'
import FreelanceCard from './freelanceCard'
import Search from '../../search'
import Pagination from '@/components/pagination'


export default function FreelancerList() {

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const { data } = useQuery({
        queryKey: ["Freelancers", search],
        queryFn: async () => {
            const { getAllUserAccountByRole } = await GraphQLRequest(GetAllUsersByRole, {
                role: "freelance",
                search,
                input: {
                    take: 20,
                    page: 1
                }
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
                <Search onChange={onHandleChange} />
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
                    {data?.item.map(({ userID, email, verified, myProfile: { firstname, lastname, avatar } }: any) => (
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
        </div>
    )
}
