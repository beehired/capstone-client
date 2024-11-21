import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/applicant/profile/template.module.scss'
import { MediumPoppins } from '@/components/typograhy'
import { TbPlus } from 'react-icons/tb'
import { ButtonIconToggle } from '@/components/button'
interface Props {
    title: string
    icon: boolean
    children: ReactNode
    value?: any
    setValue?: any
}

export default function ProfileTemplate({ title, icon, children, value, setValue }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={MediumPoppins.className}>{title}</h2>
                {icon ? <ButtonIconToggle
                    icon={<TbPlus size={23} />}
                    setValue={setValue}
                    value={value} /> :
                    null
                }
            </div>
            {children}
        </div>
    )
}
