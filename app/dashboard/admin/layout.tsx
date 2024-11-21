import React, { ReactNode } from 'react'
import Sidebar from '@/components/dashboard/admin/sidarbar'
import styles from '@/styles/dashboard/admin/layout.module.scss'

interface Props {
    children: ReactNode
}
export default function RootLayout({ children }: Props) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.body}>

                {children}
            </div>
        </div>
    )
}
