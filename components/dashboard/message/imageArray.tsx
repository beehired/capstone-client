"use client"


import React, { useState } from 'react'
import styles from '@/styles/dashboard/message/message.view.module.scss';
import Image from 'next/image'
import { TbX } from 'react-icons/tb';
import ImageViewer from '@/components/imageViewer';

export default function ImageArray({ index, file, onHandleRemoveFiles }: any) {

    const [imageViewToggle, setImageToggleView] = useState(false);


    const onHandlePreviewClose = () => {
        setImageToggleView(() => !imageViewToggle)
    }

    return (
        <div key={index} className={styles.prevImage}>
            {
                imageViewToggle && <ImageViewer image={URL.createObjectURL(file)} close={onHandlePreviewClose} />
            }
            <div onClick={onHandlePreviewClose} className={styles.image}>
                <Image src={URL.createObjectURL(file)} alt="" fill objectFit='cover' objectPosition='center' priority />
            </div>
            <button aria-label="button" onClick={onHandleRemoveFiles}>
                <TbX size={18} />
            </button>
        </div>
    )
}
