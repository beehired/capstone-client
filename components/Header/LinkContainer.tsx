import React, { ReactNode } from 'react'
import styles from '@/styles/components/Headers/linkContainer.module.scss'

interface Props {
    children: ReactNode
}

export default function LinkContainer({ children }: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
