import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/applicant/layout.module.scss'
import Message from '@/components/dashboard/applicant/message/message'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import("@/components/dashboard/applicant/header"))

interface Props {
    children: ReactNode
}
export default function RootLayout({ children }: Props) {
    return (
        <div style={{ position: "relative" }}>
            <Header />
            <div className={styles.body}>
                {children}
                <Message />
            </div>
        </div>
    )
}
