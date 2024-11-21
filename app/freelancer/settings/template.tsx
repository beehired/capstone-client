import SidebarSettings from '@/components/dashboard/settings/sidebar'
import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/settings/layout.module.scss';
import SidebarSettingsFreelancer from '@/components/dashboard/applicant/settings/sidebar';


interface Props {
    children: ReactNode
}
export default function Template({ children }: Props) {
    return (
        <div className={styles.container}>
            <SidebarSettingsFreelancer />
            {children}
        </div>
    )
}
