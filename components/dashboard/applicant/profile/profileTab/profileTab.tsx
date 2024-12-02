"use client"
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/profileTab.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { useRouter } from 'next/navigation'
import store from 'store2';

const Tab = [
    { name: "about" },
    { name: "social" },
    { name: "experience" },
    { name: "design" },
]

export default function ProfileTab() {


    const user = store.get("UserAccount");
    const router = useRouter();




    return (
        <div className={styles.container}>
            {Tab.map(({ name }) => (
                <button aria-label={name} className={styles.active} onClick={() => router.push(`/freelancer/profile/${name}/${user?.user?.myProfile.profileID}`)} key={name}>
                    <span className={RegularPoppins.className}>{name}</span>
                </button>
            ))}
        </div>
    )
}
