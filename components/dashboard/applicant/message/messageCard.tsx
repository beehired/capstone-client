"use client"

import React from 'react'
import styles from '@/styles/dashboard/applicant/message/messageCard.module.scss';
import Image from 'next/image'
import { isEmpty } from 'lodash';
import DefaultImage from '@/app/public/l60Hf.png';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { UpdateMessageStatus } from '@/util/Mutation/message.mutation';
import { queryClient } from '@/lib/provider';
import store from 'store2';



export default function MessageCard({ media, fullname, readID, message, avatar, read, id, setValue, sender }: any) {

    const user = store.get("UserAccount")
    const mutation = useMutation({
        mutationKey: ["MessageStatusUpdate", [readID]],
        mutationFn: async () => {
            return await GraphQLRequest(UpdateMessageStatus, {
                messageStatusId: [readID],
                receiverId: user?.id
            })
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["MessageList"]
            })
        }
    })

    const onHandleUserClick = () => {
        mutation.mutate();
        setValue(id)
    }

    return (
        <div onClick={onHandleUserClick} className={read || user?.id === sender?.userID
            ? `${styles.container}`
            : `${styles.container} ${styles.active}`}>
            <div className={styles.whole}>
                <div>
                    <div className={styles.avatar}>
                        <Image src={isEmpty(avatar) ? DefaultImage : avatar} alt="" fill objectFit='cover' objectPosition='center' />
                    </div>
                </div>
                <div className={styles.messageInfo}>
                    <h2>{fullname}</h2>
                    <span>{media ? "Sent a Photo" : isEmpty(message) ? null : message.length > 20 ? `${message.slice(0, 20)}...` : `${message} `}</span>
                </div>
            </div>
        </div >
    )
}
