"use client"


import React, { useState } from 'react'
import styles from '@/styles/dashboard/sidebar/profile.module.scss';
import { useRouter } from 'next/navigation';
import store from 'store2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyUserProfile } from '@/util/Query/user.query';
import { ActivityLogs } from '@/util/Mutation/activityLogs';
import toast from 'react-hot-toast';
import { deleteCookie } from 'cookies-next';
import Spinner from '@/components/spinner';
import { RegularPoppins } from '@/components/typograhy';
import { ButtonIconToggle, ButtonIconRoute } from '@/components/button';
import { TbBell, TbChevronDown, TbChevronUp, TbLogout2 } from 'react-icons/tb';
import ToastNotification from '@/components/notification';
import Image from 'next/image';
import DefaultImage from '@/app/public/l60Hf.png'
import { isEmpty } from 'lodash';
import { GetUnreadNotification } from '@/util/Query/notification.query';

export default function SidebarProfile() {


    const router = useRouter();
    const user = store.get("UserAccount");

    const { data: ProfileData, isLoading, isError } = useQuery({
        queryKey: ["UserProfile", user?.id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id

            })

            return getProfileByUser
        },
    })

    const { data: NotificationData, } = useQuery({
        queryKey: ["NotificationCount", user?.id],
        queryFn: async () => {
            const { unreadNotification } = await GraphQLRequest(GetUnreadNotification, {
                userId: user?.id
            })

            return unreadNotification
        },
        refetchInterval: 1000
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
        <div className={styles.container}>
            <div className={styles.spe}>
                <div className={styles.avatar}>
                    <Image src={isEmpty(ProfileData?.avatar?.media) ? DefaultImage : ProfileData?.avatar?.media} alt="" fill objectFit='cover' objectPosition='center' />
                </div>
                <div className={styles.userInfo}>
                    {isLoading ? <Spinner /> :

                        <>
                            <span className={`${styles.name} ${RegularPoppins.className}`}>{ProfileData?.firstname} {ProfileData?.lastname ? `${ProfileData?.lastname[0]}.` : null}</span>
                            <span className={`${styles.role} ${RegularPoppins.className}`}>Employer</span>
                        </>
                    }
                </div>
            </div>
            <div className={styles.options}>
                <ButtonIconToggle icon={toggle ? <TbChevronUp size={22} /> : <TbChevronDown size={22} />} value={toggle} setValue={setToggle} />
                <div>
                    <ButtonIconRoute icon={<TbBell size={22} />} url='/dashboard/employer/notification' />
                    {NotificationData ? <div className={styles.active} /> : null}
                </div>
            </div>

            {
                toggle ?
                    <div className={styles.toggleContainer}>
                        <button aria-label="button" onClick={onHandleLogout} className={styles.logoutBtn}>
                            <TbLogout2 size={18} />
                            <span className={RegularPoppins.className}>Logout</span>
                        </button>

                    </div> : null
            }
            <ToastNotification />
        </div>
    )
}


