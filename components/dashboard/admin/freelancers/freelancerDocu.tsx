import React, { useState } from 'react'
import styles from '@/styles/dashboard/admin/freelanceDocu.module.scss'
import Image from 'next/image';
import { MediumPoppins } from '@/components/typograhy';
import { format } from 'date-fns'
import { TbEye, TbX } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import ImageViewer from '@/components/imageViewer';

export default function FreelancerDocu({ requirement, type, createdAt }: any) {

    const [viewImage, setViewImage] = useState(false);


    const onHandleViewImage = () => {
        setViewImage(() => !viewImage)
    }
    return (
        <div className={styles.container}>
            {
                viewImage ?
                    <ImageViewer image={requirement} close={onHandleViewImage} />
                    :
                    null
            }
            <div className={styles.tbody}>
                <div className={styles.tr}>
                    <div className={styles.td}>
                        <Image src={requirement} alt="" height={100} width={150} />
                    </div>
                    <div className={styles.td}>
                        <span className={MediumPoppins.className}>{type}</span>
                    </div>
                    <div className={styles.td}>
                        <span className={MediumPoppins.className}>{format(new Date(createdAt), "MMMM dd, yyyy")}</span>
                    </div>
                    <div className={styles.td}>
                        <div className={styles.actionsBtnGrp}>
                            <button onClick={onHandleViewImage}>
                                <TbEye size={23} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
