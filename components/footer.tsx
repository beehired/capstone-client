import React from 'react'
import styles from '@/styles/components/footer.module.scss'
import { TbBrandX, TbBrandInstagram, TbBrandFacebook } from 'react-icons/tb'
import { HrefLinkV1 } from './link'
import Word from '@/app/public/word.png'
import Image from 'next/image'


const urls = [
    { name: "Terms and Condition", url: "/policy/terms&condition" },
    { name: "Data Policy", url: "/policy/datapolicy" },
]

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <div className={styles.onasd}>
                    <Image src={Word} alt="" fill priority />
                </div>
                <div className={styles.links}>
                    <HrefLinkV1 name='Companies' url='#companies' />
                    <HrefLinkV1 name='Pricing' url='#pricing' />
                    <HrefLinkV1 name='About Us' url='#about' />
                </div>
                <div className={styles.links}>
                    <HrefLinkV1 name='Terms and Condition' url='/policy/terms&condition' />
                    <HrefLinkV1 name='Data Policy' url='/policy/datapolicy' />
                </div>
            </div>
            <div className={styles.socialMedia}>
                <TbBrandX size={30} />
                <TbBrandInstagram size={30} />
                <TbBrandFacebook size={30} />
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
