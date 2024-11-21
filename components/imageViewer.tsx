import React from 'react'
import Dialog from './dialog'
import Image from 'next/image'
import { TbX } from 'react-icons/tb'
import styles from '@/styles/components/imageViewer.module.scss'



export default function ImageViewer({ image, close }: any) {

    return (
        <Dialog>
            <div className={styles.imageViewer}>
                <div className={styles.header}>
                    <button onClick={close}>
                        <TbX size={23} />
                    </button>
                </div>
                <div className={styles.image}>

                    <Image src={image} alt="" objectFit='contain' fill />
                </div>
            </div>
        </Dialog>
    )
}
