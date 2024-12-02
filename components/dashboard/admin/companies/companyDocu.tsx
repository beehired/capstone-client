import React from 'react'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'
import styles from '@/styles/dashboard/admin/compnay.document.module.scss';
import { format } from 'date-fns';
import { TbEye } from 'react-icons/tb';


export default function CompanyDocu({ data }: any) {
    return (
        <div className={styles.body}>
            <div className={styles.thead}>
                <div className={styles.tr}>
                    <div className={styles.th}>Filename</div>
                    <div className={styles.th}>Date Created</div>
                    <div className={styles.th}>Action</div>
                </div>
            </div>
            <div className={styles.tbody}>
                {isEmpty(data) ? <NotAvailable /> :
                    data?.map(({ requirementsID, type, requirement, createdAt }: any) => (
                        <div className={styles.tr} key={requirementsID}>
                            <div className={styles.td}>
                                <span>{type.length <= 30 ? type : `${type.slice(0, 30)}...`}</span>
                            </div>
                            <div className={styles.td}>
                                <span>{format(new Date(createdAt), "MMMM dd, yyyy")}</span>
                            </div>
                            <div className={styles.td}>
                                <a aria-label='View' target="_blank" href={requirement}>
                                    <TbEye size={23} />
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
