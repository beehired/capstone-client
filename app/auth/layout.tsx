import React, { ReactNode } from 'react'
import styles from '@/styles/auth/layout.module.scss'
import dynamic from 'next/dynamic'

const Side = dynamic(() => import("@/components/auth/side"), {
    ssr: false
})
interface Props {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.side}>
                <Side />
            </div>
            <div className={styles.child}>
                {children}
            </div>
        </div >
    )
}
