import React from 'react'
import styles from '@/styles/components/label.module.scss'
import { RegularPoppins } from './typograhy'
interface Props {
    name: string
    required: boolean
}

export default function Label({ name, required }: Props) {
    return (
        <label aria-label={name} className={`${styles.label} ${RegularPoppins.className}`}>
            {name} {required ? <span className={styles.required}>*</span> : null}
        </label>
    )
}
