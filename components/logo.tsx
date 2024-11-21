import React from 'react'
import Image from 'next/image'
import Logo from '@/app/public/beehired.png'
import styles from '@/styles/components/logo.module.scss'

export default function LogoContainer() {
    return (
        <div className={styles.container}>
            <Image src={Logo} alt="" height={130} width={130} priority />
        </div>
    )
}
