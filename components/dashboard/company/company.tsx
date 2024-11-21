"use client"
import React from 'react'
import styles from '@/styles/dashboard/company/company.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { GetCompany } from '@/util/Query/company'
import Image from 'next/image'
import store from 'store2'
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import Spinner from '@/components/spinner';

export default function Company() {

    const user = store.get("UserAccount")


    const { data, isLoading } = useQuery({
        queryKey: ["Company", user?.id],
        queryFn: async () => {
            return GraphQLRequest(GetCompany, {
                userId: user?.id
            })
        }
    })


    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                {isLoading ? <Spinner /> :
                    <>
                        <div className={styles.avatar}>
                            <Image src={data?.getMyCompanyByUserID?.logo?.media} alt="" fill priority />
                        </div>
                        <div className={styles.l}>
                            <span className={`${RegularPoppins.className} ${styles.head}`}>{data?.getMyCompanyByUserID?.companyName}</span>
                            <span className={`${styles.plan} ${RegularPoppins.className}`}>{data?.getMyCompanyByUserID?.user.plan} &#8729; {data?.getMyCompanyByUserID?.verified ? 'Verified' : 'Not Verified'} </span>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
