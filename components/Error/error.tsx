import React from 'react'
import styles from '@/styles/Error/error.module.scss';
import { MediumPoppins } from '../typograhy';

type Message = {
    message: string
}

export default function Error({ message }: Message) {
    return (
        <div className={styles.container}>
            <span className={MediumPoppins.className}>{message}</span>
        </div>
    )
}
