import React, { ReactNode } from 'react'
import styles from '@/styles/components/prompt.module.scss';
import { MediumPoppins } from './typograhy';


interface Props {
    children: ReactNode
    title: string
    icon?: any
}

export default function Prompt({ icon, title, children }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.prompt}>
                <div className={styles.header}>
                    {icon}
                    <h2 className={MediumPoppins.className}>{title}</h2>
                </div>
                {children}
            </div>
        </div>
    )
}
