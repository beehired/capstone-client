import React from 'react'
import styles from '@/styles/dashboard/admin/freelance.module.scss'
import { TbLink, TbTrash } from 'react-icons/tb'
import DefaultImage from '@/app/public/l60Hf.png';
import Image from 'next/image'
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation'
export default function FreelanceCard({ name, userID, email, avatar, verified }: any) {

    const router = useRouter();

    return (
        <div className={styles.tr}>
            <div className={styles.td}>
                <div className={styles.avatar}>
                    <Image src={isEmpty(avatar) ? DefaultImage : avatar} alt="" fill objectFit='cover' objectPosition='center' />
                </div>
            </div>
            <div className={styles.td}>{name}</div>
            <div className={styles.td}>{email}</div>
            <div className={styles.td}>{verified ? "Verified" : "Not Verified"}</div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <button name={name} onClick={() => router.push(`/dashboard/admin/freelancers/${userID}`)}>
                        <TbLink size={23} />
                    </button>
                </div>
            </div>
        </div>
    )
}
