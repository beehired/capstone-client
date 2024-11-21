"use client"

import React, { FormEvent } from 'react'
import styles from '@/styles/components/textarea.module.scss';
import { RegularPoppins } from './typograhy';
import SpanError from './Error/spanError';


interface Props {
    name: string,
    value: string,
    onChange: any
    placeholder: string
    errors: any
    touched: any
}

export default function Textarea({ name, placeholder, onChange, value, errors, touched }: Props) {

    return (
        <div>
            <textarea className={`${styles.container} ${RegularPoppins.className}`} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            <div className={styles.limit}>
                <span style={value?.length > 10000 ? { color: "red" } : {}}>{value?.length}/1000</span>
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}
