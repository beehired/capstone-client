import React, { ReactNode } from 'react'
import styles from '@/styles/components/form.module.scss';


interface Props {
    children: ReactNode,
    onSubmit: any
}
export default function Form({ children, onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit} className={styles.container}>
            {children}
        </form>
    )
}
