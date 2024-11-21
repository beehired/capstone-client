import React from 'react'
import styles from '@/styles/Error/spanError.module.scss';

export default function SpanError({ message }: { message: string | string[] }) {
    return (
        <span className={styles.spanError}>{message}</span>
    )
}
