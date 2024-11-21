import React from 'react'
import styles from '@/styles/auth/loading.module.scss';
import Logo from '@/app/public/beehired.png';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className={styles.container}>
            <Image src={Logo} alt="" height={200} width={200} priority />
            <span>Loading...</span>
        </div>
    )
}
