import React, { ReactNode } from 'react'
import styles from '@/styles/components/template.module.scss'
import { MediumPoppins, RegularPoppins } from '../typograhy'
import { ButtonGoBack } from '../button'

interface Props {
    title: string
    goback?: boolean
    children: ReactNode
}
export default function BodyTemplate({ title, children, goback }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={`${MediumPoppins.className} ${styles.title}`}>{title}</h2>
                {goback ? <ButtonGoBack /> : null}
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    )
}
