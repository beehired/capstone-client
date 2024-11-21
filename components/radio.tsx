import React from 'react'
import styles from '@/styles/components/radio.module.scss';

type RadioInputProps = {
    name: string,
    onChange: any,
    checked?: boolean,
    value: any
}


export default function InputRadio({ name, onChange, value, checked }: RadioInputProps) {
    return (
        <input className={styles.container} value={value} type="radio" checked={checked} name={name} id={name} onChange={onChange} />
    )
}
