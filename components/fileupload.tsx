"use client"
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RegularPoppins } from './typograhy';
import { TbTrash, TbUpload } from 'react-icons/tb';

import NextImage from 'next/image'
import styles from '@/styles/components/fileupload.module.scss';
import toast from 'react-hot-toast';
import ToastNotification from './notification';


export default function FileUploads(props: any) {

    const { setFieldValue, value, selectedFile, dragisActive, isNotActive, requiredWidth, requiredHeight, componentName } = props
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const onDrop = useCallback((acceptedFiles: Array<File>) => {

        const file = new FileReader

        file.onload = () => {

            setPreview(file.result);
            const img: HTMLImageElement = new Image();
            img.src = file.result as string;


            if (componentName === "company") {
                img.onload = () => {
                    if (img.width === requiredWidth && img.height === requiredHeight) {
                        setPreview(file.result)
                    } else {
                        selectedFile(null);
                        toast.error("Image required is 500x500px");
                        setFieldValue("upload", null)
                    }
                }
            }
        }


        file.readAsDataURL(acceptedFiles[0])
        selectedFile(acceptedFiles[0])
        setFieldValue("upload", acceptedFiles[0].name)
    }, [componentName, requiredHeight, requiredWidth, selectedFile, setFieldValue])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/avif': [],
            'image/png': [],
            'image/jpg': []
        },
        onError: () => {
            toast.error("Invalid File Format")
        }
    })

    return (
        <div>
            {value ? preview && (
                <div className={styles.fileUpload}>
                    <NextImage src={preview as string} alt="Upload preview" fill objectFit='contain' priority blurDataURL={preview as string} />
                </div>
            ) : <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} onClick={open} />
                {
                    isDragActive ? <div className={styles.fileup}>
                        <span className={RegularPoppins.className}>{dragisActive}</span>
                    </div> :
                        <div className={styles.notactive}>
                            <TbUpload size={30} />
                            <span>{isNotActive}</span>
                        </div>
                }
            </div>}
            <div>
                {value ?
                    <div className={styles.upload}>
                        {value}
                        <button aria-label="button" onClick={() => setFieldValue("upload", null)}>
                            <TbTrash size={20} />
                        </button>
                    </div> : null}
            </div>
            <ToastNotification />
        </div>
    )
}
