'use client'
import React from 'react'
import styles from '@/styles/dashboard/applicant/gotolink.module.scss'
import { RouteButtonV1 } from '@/components/button'
import store from 'store2'

export default function GotoLink() {


    const user = store.get("UserAccount");
    const url = `/bee/${user?.user?.myProfile?.profileID}`

    return (
        <div className={styles.container}>
            <RouteButtonV1 name='Go to this Profile' url={url} />
        </div>
    )
}
