import React from 'react'
import styles from '@/styles/dashboard/applicant/header.module.scss';
import Profile from './profile';
import Notification from '../header/notification';
import LinkContainer from '@/components/Header/LinkContainer';
import Logo from '@/app/public/beehired.png'
import Image from 'next/image'
import { HrefLinkV1 } from '@/components/link';

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <Image src={Logo} height={80} width={80} alt="" priority />
                <LinkContainer>
                    <HrefLinkV1 name='Find Job' url='/freelancer/find-job' />
                    <HrefLinkV1 name='Applications' url='/freelancer/applications' />
                    <HrefLinkV1 name='My Projects' url='/freelancer/my-projects' />
                    <HrefLinkV1 name='Interviews' url='/freelancer/interview' />
                </LinkContainer>
            </div>
            <div className={styles.profile}>
                <Notification />
                <Profile />
            </div>
        </div>
    )
}
