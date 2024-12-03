import React from 'react'
import { HrefLinkV2 } from '../link'
import styles from '@/styles/auth/notice.module.scss'
import Link from 'next/link'
export default function Notice() {
    return (
        <div className={styles.container}>
            <span>By clicking Login or Sign up, you agree to our {" "}
                <Link href="/terms-and-conditions">Terms and Conditions</Link> and <Link href="/data-policy">Data Policy</Link>.
            </span>
        </div>
    )
}
