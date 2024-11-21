"use client"
import styles from '@/styles/components/home/companies.module.scss'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllCompanies } from '@/util/Query/company'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { RegularPoppins } from '../typograhy'
import Image from 'next/image'
import Spinner from '../spinner'

export default function Companies() {

    const { data, isLoading } = useQuery({
        queryKey: ["GetAllCompanies"],
        queryFn: async () => {
            const { getAllCompanies } = await GraphQLRequest(GetAllCompanies, {
                input: {
                    take: 10,
                    page: 1
                }
            })

            return getAllCompanies
        }
    })
    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> : data?.item.map(({ companyID, companyName, description, logo, companySize }: any) => (
                <div className={styles.companyCard} key={companyID}>
                    <div className={styles.header}>
                        <Image src={logo?.media} alt="" height={80} width={80} />
                        <div>
                            <h2 className={RegularPoppins.className}>{companyName}</h2>
                            <span>{companySize}</span>
                        </div>
                    </div>
                    <div>
                        {description.slice(0, 200)}...
                    </div>
                </div>
            ))}
        </div>
    )
}
