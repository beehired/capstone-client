import React from 'react'
import styles from '@/styles/dashboard/admin/companies.module.scss';
import { useRouter } from 'next/navigation';
import { RegularPoppins } from '@/components/typograhy';
import Image from 'next/image'
import { TbLink } from 'react-icons/tb'
export default function CompanyCard({ media, companyName, companySize, getJobPostCount, verified, slug, plan, email }: any) {

    const router = useRouter();


    return (
        <div className={styles.tr}>
            <div className={styles.td}>
                <Image src={media} alt="" height={80} width={80} objectFit='cover' objectPosition='center' />
                <span className={RegularPoppins.className}>{companyName}</span>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{email}</span>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{plan}</span>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{getJobPostCount}</span>
            </div>
            <div className={styles.td}>
                <span className={RegularPoppins.className}>{verified ? "Verified" : "Not Verified"}</span>
            </div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <button onClick={() => router.push(`/dashboard/admin/companies/${slug}`)}>
                        <TbLink size={23} />
                    </button>
                </div>
            </div>
        </div>
    )
}
