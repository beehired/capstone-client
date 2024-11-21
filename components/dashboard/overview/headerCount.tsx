import React from 'react'
import styles from '@/styles/dashboard/dashboard/headerCount.module.scss';
import { LightPoppins, RegularPoppins } from '@/components/typograhy';

export default function HeaderCount({ name, count }: { name: string, count: number }) {
    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <span className={LightPoppins.className}>{name}</span>
                <h2 className={RegularPoppins.className}>{count}</h2>
            </div>
        </div>
    )
}
