import React from 'react'
import styles from '@/styles/components/footer.module.scss'
import { HrefLinkV1 } from './link'
import Word from '@/app/public/word.png'
import Image from 'next/image'


const urls = [
    { name: "Terms & Conditions", url: "/terms-and-conditions" },
    { name: "Data Policy", url: "/data-policy" },
]

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <div className={styles.onasd}>
                    <Image src={Word} alt="" fill priority />
                </div>
                <div className={styles.links}>
                    <HrefLinkV1 name='Companies' url='/#companies' />
                    <HrefLinkV1 name='About Us' url='/#about' />
                    <HrefLinkV1 name='Pricing' url='/#pricing' />
                </div>
                <div className={styles.links}>
                    <HrefLinkV1 name='Terms and Conditions' url='/terms-and-conditions' />
                    <HrefLinkV1 name='Data Policy' url='/data-policy' />
                </div>
            </div>

            <div className={styles.footer}>
                <span>&copy;  {new Date().getFullYear()}  BeeHired. All Rights Reserved.</span>
                <div className={styles.footerLink}>
                    {urls.map(({ name, url }) => (
                        <HrefLinkV1 key={name} name={name} url={url} />
                    ))}
                </div>
            </div>
        </div>
    )
}
