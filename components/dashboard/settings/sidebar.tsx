import React from 'react'
import styles from '@/styles/dashboard/settings/sidebar.module.scss'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { SettingsAccount, SettingsCompany, SettingsWorkpac } from '@/util'
import { HrefLinkV1 } from '@/components/link'


export default function SidebarSettings() {
    return (
        <div className={styles.container}>
            <h2 className={MediumPoppins.className}>Settings</h2>
            <div className={styles.card}>
                <span className={RegularPoppins.className}>Account</span>
                <div className={styles.cardLink}>
                    {SettingsAccount.map(({ name, url }) => (
                        <HrefLinkV1 url={url} key={name} name={name} />
                    ))}
                </div>
            </div>
            <div className={styles.card}>
                <span className={RegularPoppins.className}>Company</span>
                <div className={styles.cardLink}>
                    {SettingsCompany.map(({ name, url }) => (
                        <HrefLinkV1 url={url} key={name} name={name} />
                    ))}
                </div>
            </div>
            <div className={styles.card}>
                <span className={RegularPoppins.className}>Workpace</span>
                <div className={styles.cardLink}>
                    {SettingsWorkpac.map(({ name, url }) => (
                        <HrefLinkV1 url={url} key={name} name={name} />
                    ))}
                </div>
            </div>
        </div>
    )
}
