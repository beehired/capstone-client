import React from 'react'
import styles from '@/styles/components/notavailable.module.scss';
import { RegularPoppins } from './typograhy';

export default function NotAvailable() {
    return (
        <div className={styles.container}>
            <span className={RegularPoppins.className}>No Data Available</span>
        </div>
    )
}
