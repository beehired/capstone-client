import Image from 'next/image'
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/design.card.module.scss';
import { RegularPoppins } from '@/components/typograhy';


export default function Card({ id, name, image, s, handleChange, value }: { id: string, name: string, image: string, s: string, handleChange: any, value: any }) {
    return (
        <button aria-label={name} value={id} name={s} onClick={(e) => handleChange(s, id)} className={value === id ? `${styles.container} ${styles.active}` : `${styles.container}`}>
            <div className={styles.avatar}>
                <Image src={image} alt='' fill objectFit='contain' priority blurDataURL={image} />
            </div>
            <h2 className={RegularPoppins.className}>{name}</h2>
        </button>
    )
}
