import Link from 'next/link';
import React from 'react';
import styles from '@/styles/components/hrefLink.module.scss';
import { RegularPoppins } from './typograhy';

interface Props {
    url: string
    name: string
}

export function HrefLinkV1({ url, name }: Props) {
    return (
        <Link aria-label={name} className={styles.linkv1} href={url}>{name}</Link>
    )
}


export function HrefLinkV2({ url, name }: Props) {
    return (
        <Link aria-label={name} className={styles.linkv2} href={url}>{name}</Link>
    )
}


interface V3 {
    url: string
    name: string
    icon: any
    setState?: any
}

export function HrefLinkV3({ url, name, icon, setState }: V3) {
    return (
        <Link aria-label={name} onClick={() => setState(false)} className={`${styles.linkv3} ${RegularPoppins.className}`} href={url} >
            {icon} {name}
        </Link>
    )
}   