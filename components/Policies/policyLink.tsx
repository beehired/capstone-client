
import React from 'react'
import { HrefLinkV1 } from '../link'
import styles from '@/styles/components/policys.module.scss';

export default function PolicyLink() {
    return (
        <div className={styles.policys}>
            <HrefLinkV1 name='Terms and Condition' url='/' />
            <HrefLinkV1 name='Data Policy' url='/' />
            <HrefLinkV1 name='Cookies Policy' url='/' />
        </div>
    )
}
