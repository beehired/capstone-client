"use client"

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '@/styles/components/fileUploadFreelancer.module.scss'
import { TbTrash } from 'react-icons/tb'
import { RegularPoppins } from './typograhy'
export default function FileFreelancer(props: any) {

    const { setFieldValue } = props

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        setFieldValue("fileUpload", acceptedFiles[0])
    }, [setFieldValue])
    
    const { acceptedFiles, getRootProps, getInputProps, open, } = useDropzone({
        noDrag: true,
        noKeyboard: true,
        multiple: false,
        maxFiles: 1,
        onError: (err) => {
            alert(err.message)
        },
        useFsAccessApi: false,
        accept: {
            'image/png': ['.png', 'jpg', 'jpeg'],
        }
    })

    console.log(acceptedFiles[0])

    const onHandleRemoveFile = () => {
        acceptedFiles.pop()
    }

    return (
        <div className={styles.container}>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <button className={styles.filebtn} type="button" onClick={open}>
                    <span className={RegularPoppins.className}>
                        {acceptedFiles[0] ? acceptedFiles[0].name : "Upload Your Document"}
                    </span>
                </button>
                {/* <ul>{files}</ul> */}
            </div>
            {
                acceptedFiles[0] ?
                    <button type="button" onClick={onHandleRemoveFile}>
                        <TbTrash size={23} />
                    </button> : null

            }
        </div>
    )
}
