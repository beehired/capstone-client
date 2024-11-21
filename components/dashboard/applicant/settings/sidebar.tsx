import React from 'react'
import styles from '@/styles/dashboard/settings/sidebar.module.scss'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { SettingsAccount, SettingsCompany, SettingsWorkpac } from '@/util'
import { HrefLinkV1 } from '@/components/link'


export default function SidebarSettingsFreelancer() {
    return (
        <div className={styles.container}>
            <h2 className={MediumPoppins.className}>Settings</h2>
            <div className={styles.card}>

                <HrefLinkV1 url={'/freelancer/settings/profile'} name={'Profile'} />
                <HrefLinkV1 url={'/freelancer/settings/accounts'} name={'Account security'} />
            </div>
        </div>
    )
}
