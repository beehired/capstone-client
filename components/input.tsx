import React, { FormEvent, SyntheticEvent, useState } from 'react'
import styles from '@/styles/components/input.module.scss'
import { MiniCalendar } from './dashboard/calendar/calendar'
import { TbCalendar } from 'react-icons/tb'
import { RegularPoppins } from './typograhy'
import { format, isValid } from 'date-fns'
import SpanError from './Error/spanError'

interface Props {
    name: string
    placeholder: string
    type: 'text' | 'password' | 'tel' | 'email',
    value: string,
    onChange: any,
    errors?: any,
    touched?: any
    icon?: any
    max?: number
}

export function InputV1({ name, placeholder, onChange, value, type, icon, errors, touched, max }: Props) {


    return (
        <div className={styles.container}>
            <div className={styles.input}>
                {icon}
                <input className={RegularPoppins.className} maxLength={max} name={name} id={name} placeholder={placeholder} type={type} value={value} onChange={onChange} aria-label={name} />
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}


interface PropsV2 {
    name: string
    placeholder: string
    type: 'text' | 'password' | 'tel' | 'email',
    value: string,
    onChange: any,
    icon?: any,
    icon2: any,
    toggle: any,
    onToggle: any
    errors: any,
    touched: any
}

export function InputV2({ name, placeholder, onChange, value, type, icon, icon2, onToggle, toggle, errors, touched }: PropsV2) {

    const onHandleToggle = () => {
        onToggle(() => !toggle)
    }
    return (
        <div className={styles.inputv2}>
            <div className={styles.ic}>
                <div>
                    {icon}
                </div>
                <input className={RegularPoppins.className} name={name} id={name} placeholder={placeholder} type={type} value={value} onChange={onChange} aria-label={name} />
                <button onClick={onHandleToggle} type='button'>
                    {icon2}
                </button>
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}



interface InputCalendar {
    name: string
    placeholder: string,
    value: any,
    onChange: any,
    errors: any
    touched: any
}

export const InputCalendar = ({ name, placeholder, value, onChange, errors, touched }: InputCalendar) => {

    const [toggle, setToggle] = useState(false)


    const date = isValid(value)

    let formattedDate = ''

    if (value) {
        const date = typeof value === "string" ? new Date(value) : value

        if (isValid(date)) {
            formattedDate = format(date, "MMMM dd, yyyy")
        }
    }


    const onHandleChange = (e: any) => {
        onChange("endDate", e.target.value)
    }

    return (
        <div className={styles.InputCalendar}>
            <div className={styles.ic}>
                <input type="text" value={formattedDate} id={name} name={name} aria-label={name} placeholder={placeholder} readOnly />
                <button type="button" onClick={() => setToggle(() => !toggle)}>
                    <TbCalendar size={26} />
                </button>
                {
                    toggle ? <MiniCalendar onSelected={onChange} name={name} setValue={setToggle} /> : null
                }
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}


interface InputNumber {
    name: string
    value: number,
    onChange: any
    errors: any,
    touched: any
}


export const InputNumber = ({ name, value, onChange, errors, touched }: InputNumber) => {
    return (
        <div className={styles.InputNumber}>
            <div className={styles.ic}>
                <input className={RegularPoppins.className} type="number" id={name} name={name} aria-label={name} value={value} onChange={onChange} />
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}


interface InputTime {
    name: string
    value: string
    onChange: any
    errors: any
    touched: any
}

export const InputTime = ({ name, value, onChange, errors, touched }: InputTime) => {
    return (
        <div className={styles.inputTime}>
            <div className={styles.ic}>
                <input type="time" name={name} id={name} value={value} aria-label={name} onChange={onChange} />
            </div>
            <div className={styles.errors}>
                {errors && touched ? <SpanError message={errors} /> : null}
            </div>
        </div>
    )
}