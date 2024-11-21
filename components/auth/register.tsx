"use client"
import React from 'react'
import styles from '@/styles/auth/register.module.scss';
import { MediumPoppins } from '../typograhy';
import { HrefLinkV2 } from '../link';
import { useRouter } from 'next/navigation';
import { TbUser, TbDevices, } from 'react-icons/tb';


const users = [
    {
        name: "I am Employer", url: "/auth/register/employer", icon: <TbUser size={30} />, description: "Select this option to post job listings and find skilled freelancers to support your projects. Manage applications and communicate directly with candidates to streamline your hiring process"
    },
    { name: "I am a Freelancer", url: "/auth/register/freelancer", icon: <TbDevices size={30} />, description: "Select this option to create a detailed profile and showcase your skills to potential employers. Browse job opportunities and apply for projects that align with your expertise and interests." }
]


export default function Register() {


    const router = useRouter();

    return (
        <div className={styles.container}>
            <h2 className={MediumPoppins.className}>Are you a Employer or Freelancer</h2>

            <div className={styles.users}>
                {users.map(({ name, icon, url, description }) => (
                    <button key={name} onClick={() => router.push(url)} className={styles.user}>
                        <div className={styles.iconContainer}>
                            {icon}
                        </div>
                        <div className={styles.aa}>
                            <h2 className={MediumPoppins.className}>{name}</h2>
                            <span>{description}.</span>
                        </div>
                    </button>
                ))}
            </div>
            <div>
                <span>Already have an account? </span>
                <HrefLinkV2 name='Log in' url='/auth/login' />
            </div>
        </div>
    )
}
