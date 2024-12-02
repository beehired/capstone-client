"use client"

import React, { useEffect, useState } from 'react'
import styles from '@/styles/dashboard/header/profile.module.scss';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import { TbChevronDown, TbLogout2 } from 'react-icons/tb';
import { ButtonIconToggle } from '@/components/button';
import { GetMyUserProfile } from '@/util/Query/user.query';
import store from 'store2'
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next'
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { ActivityLogs } from '@/util/Mutation/activityLogs';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/spinner';
import { useRef } from 'react';


export default function Profile() {

    const router = useRouter();
    const user = store.get("UserAccount");
    const closeAction = useRef(null)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["UserProfile"],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id

            })

            return getProfileByUser
        },
        networkMode: "always"
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

    const onHandleLogout = async () => {

        await mutation.mutateAsync({
            userId: user?.id
        })



    }

    const [toggle, setToggle] = useState(false)


    return (
        <div ref={closeAction} className={styles.container}>
            <div className={styles.avatar}>
                {isLoading ? <Spinner /> : <span className={MediumPoppins.className}>{data?.firstname[0]}{data?.lastname[0]}</span>}
            </div>
            <ButtonIconToggle icon={<TbChevronDown size={18} />} value={toggle} setValue={setToggle} />
            {
                toggle ?
                    <div className={styles.toggleContainer}>
                        <button aria-label="button" onClick={onHandleLogout} className={styles.logoutBtn}>
                            <TbLogout2 size={18} />
                            <span className={RegularPoppins.className}>Logout</span>
                        </button>
                    </div> : null
            }
        </div>
    )
}
