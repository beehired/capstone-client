import React from 'react'
import styles from '@/styles/dashboard/header.module.scss';
import Profile from './header/profile';
import Notification from './header/notification';

export default function DashboardHeader() {

    return (
            <div className={styles.container}>
                <div></div>
                <div className={styles.mainContainer}>
                    <Notification />
                    <Profile />
                </div>
            </div>
    )
}
