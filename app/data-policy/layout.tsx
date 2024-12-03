import React, { ReactNode } from 'react'
import Web from '@/components/Header/web'
import styles from '@/styles/policy/layout.module.scss';
import Header from '@/components/header';
import Mobile from '@/components/Header/mobile';

interface Props {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {

    return (
        <div>
            <Header>
                <Web />
                <Mobile />
            </Header>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}
