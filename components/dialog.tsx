"use client"

import React, { ReactNode } from 'react'
import styles from '@/styles/components/diaglog.module.scss';

interface Props {
    children: ReactNode
}

export default function Dialog({ children }: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
