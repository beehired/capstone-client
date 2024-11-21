"use client"

import React, { useState } from 'react'
import styles from '@/styles/components/selectForm.module.scss'
import { RegularPoppins } from './typograhy'
import { TbChevronDown, TbChevronUp } from 'react-icons/tb'
import { values } from 'lodash'
import SpanError from './Error/spanError'


type Type = {
    name: string,
    value: string | boolean | number | any
}
interface Props {
    title: string
    size: Array<Type>,
    value: any
    onClick: any,
    errors: any,
    touched: any
}

export default function SelectForm({ title, size, onClick, value, errors, touched }: Props) {

    const [toggle, setToggle] = useState(false)

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }
    return (
        <div className={styles.container}>
            <select className={`${RegularPoppins.className}`} onChange={onClick} value={value}>
                <option hidden >-</option>
                {size.map(({ name, value }) => (
                    <option key={name} value={value} className={RegularPoppins.className}>{name}</option>
                ))}
            </select>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}
