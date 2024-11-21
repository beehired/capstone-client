"use client"

import React, { useState } from 'react'
import { RegularPoppins } from '@/components/typograhy'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetMyUserProfile } from '@/util/Query/user.query'
import { useMutation, useQuery } from '@tanstack/react-query'
import styles from '@/styles/dashboard/applicant/profile.module.scss'
import store from 'store2'
import { TbChevronDown, TbBookmark, TbLogout2, TbNote, TbSettings, TbTools, TbUser } from 'react-icons/tb'
import { ButtonIconToggle } from '@/components/button'
import UserProfile from './profile/user.profile'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { ActivityLogs } from '@/util/Mutation/activityLogs'
import { toast } from 'react-hot-toast'
import Spinner from '@/components/spinner'
import { HrefLinkV3 } from '@/components/link'
import DefaultImage from '@/app/public/l60Hf.png'
import Image from 'next/image'

export default function Profile() {

    const user = store.get("UserAccount")
    const router = useRouter();
    const [open, setOpen] = useState(false)

    const [toggle, setToggle] = useState(false)
    const { data, isLoading } = useQuery({
        queryKey: ["UserProfile", user?.id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id
            })

            return getProfileByUser
        },
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



    const ApplicationLink = [
        { name: "Your Profile", url: `/freelancer/profile/about/${user?.user?.myProfile?.profileID}`, icon: <TbUser size={18} /> },
        { name: "Saved Jobs", url: "/freelancer/save-jobs", icon: <TbBookmark size={18} /> },
        { name: "Application", url: "/freelancer/applications", icon: <TbNote size={18} /> },
        { name: "My Projects", url: "/freelancer/my-projects", icon: <TbTools size={18} /> },
        { name: "Account Settings", url: "/freelancer/settings/profile", icon: <TbSettings size={18} /> }
    ]

    return (
        <div >
            <div className={styles.profile}>
                {isLoading ? <Spinner /> : <div className={styles.bgProfile}>
                    {data?.avatar ? <Image src={data?.avatar.media} alt="" height={44} width={60} style={{
                        objectPosition: "center",
                        objectFit: "cover"
                    }} priority /> : <Image src={DefaultImage} alt="" height={44} width={60} style={{
                        objectPosition: "center",
                        objectFit: "cover"
                    }} priority />}
                </div>}
                <ButtonIconToggle icon={<TbChevronDown size={23} />} setValue={setToggle} value={toggle} />
                {toggle ? <div id="profile" className={styles.profileContainer}>
                    <UserProfile />
                    {ApplicationLink.map(({ icon, name, url }) => (
                        <HrefLinkV3 key={name} icon={icon} name={name} url={url} />
                    ))}
                    <hr />
                    <button onClick={onHandleLogout} className={styles.logout}>
                        <TbLogout2 size={18} />
                        <span className={RegularPoppins.className}>Logout</span>
                    </button>
                </div> : null}
            </div>
        </div>
    )
}
