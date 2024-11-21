import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/layout.module.scss'
import Sidebar from '@/components/dashboard/sidebar'


interface Props {
    children: ReactNode
}
export default function RootLayout({ children }: Props) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.om}>
                {children}
            </div>
        </div>
    )
}
