"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/admin/profile.module.scss'
import store from 'store2'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetMyUserProfile } from '@/util/Query/user.query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { TbChevronUp } from 'react-icons/tb'
import { deleteCookie } from 'cookies-next'
import { ActivityLogs } from '@/util/Mutation/activityLogs'
import { toast } from 'react-hot-toast'
import Spinner from '@/components/spinner'

export default function AdminProfile() {

    const [toggle, setToggle] = useState(false)
    const user = store.get("UserAccount")
    const router = useRouter();
    const { data, isLoading } = useQuery({
        queryKey: ["UserProfile", user?.id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id
            })

            return getProfileByUser
        }
    })

    const mutation = useMutation({
        mutationKey: ["LoggedOut"],
        mutationFn: async (inputValues: { userId: any }) => {
            return await GraphQLRequest(ActivityLogs, inputValues)
        },
        onSuccess: async () => {
            toast.success("Successfully Logged Out!")
            store.remove("UserAccount");
            deleteCookie("access_token");
            router.push("/")
        }
    })


    const onHandleLogoutBtn = async () => {

        await mutation.mutateAsync({
            userId: user?.id
        })

    }
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <div className={styles.logoutContainer}>
                    <button className={styles.toggleLogout} onClick={() => setToggle(() => !toggle)}>
                        <TbChevronUp size={15} />
                    </button>
                    {toggle ? <div className={styles.con}>
                        <button onClick={onHandleLogoutBtn}>
                            <span className={RegularPoppins.className}>Logout</span>
                        </button>
                    </div> : null}
                </div>
                {isLoading ? <Spinner /> :
                    <span className={`${styles.name} ${MediumPoppins.className}`}>{data?.firstname[0]}{data?.lastname[0]}</span>
                }
            </div>
            <div className={styles.userInfo}>
                <span className={`${styles.name} ${RegularPoppins.className}`}>{data?.firstname} {data?.lastname}</span>
                <span className={`${styles.role} ${RegularPoppins.className}`}>Administrator</span>
            </div>
        </div>
    )
}
