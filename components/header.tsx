import React, { ReactNode } from 'react'
import styles from '@/styles/components/header.module.scss';


interface Props {
    children: ReactNode
}


export default function Header({ children }: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
