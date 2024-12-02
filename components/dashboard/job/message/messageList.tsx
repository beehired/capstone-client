"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/dashboard/message/sideMessage.module.scss'
import { useQuery } from '@tanstack/react-query'
import { GetMessageList, GetWhoMessageMe } from '@/util/Query/message.query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import store from 'store2'
import { useParams, useRouter } from 'next/navigation'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import Image from 'next/image'
import DefaultImage from '@/app/public/l60Hf.png'
import { isEmpty } from 'lodash'
import { Lato } from 'next/font/google'
import { useMutation } from '@tanstack/react-query'
import { UpdateMessageStatus } from '@/util/Mutation/message.mutation'
import { useFormik } from 'formik'


const lato = Lato({
    weight: "400",
    display: "auto",
    subsets: ["latin"],
    style: "normal"
})

export default function MessageList() {

    const params = useParams();
    const user = store.get("UserAccount");
    const router = useRouter()
    const [search, setSearch] = useState("");

    const { data } = useQuery({
        queryKey: ["MessageList", user?.id, search],
        queryFn: async () => {
            const { getMessages } = await GraphQLRequest(GetMessageList, {
                userId: user?.id,
                search
            })

            return getMessages
        },
        refetchInterval: 1000
    })

    const mutation = useMutation({
        mutationKey: ["MessageUpdate", params.id],
        mutationFn: async (inputValues: { messageStatusId: string, receiverId: string }) => {
            return await GraphQLRequest(UpdateMessageStatus, inputValues)
        }
    })


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={MediumPoppins.className}>Message</h2>
                <div className={styles.message}>
                    <input aria-label='search' type="search" placeholder='Search message' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className={styles.opi}>
                {data?.map(({ userID, message: { messageID, message, media, messageStatus: { messageStatusID, isRead }, sendUser }, user: { myProfile } }: any) => (
                    <div onClick={() => {
                        router.push(`/dashboard/employer/message/b/${userID}`)

                        mutation.mutateAsync({
                            messageStatusId: messageStatusID,
                            receiverId: user?.id
                        })

                    }} className={styles.messageCard} key={userID}>
                        <div className={styles.card}>
                            <div className={styles.info}>
                                <div className={styles.avatar}>
                                    <Image src={isEmpty(myProfile?.avatar) ? DefaultImage : myProfile?.avatar?.media} alt="" fill objectPosition='center' objectFit='cover' priority />
                                </div>
                                <div className={isRead || sendUser?.userID === user?.id ? "" : styles.actiive}>
                                    <h2 className={RegularPoppins.className}>{myProfile?.firstname} {myProfile?.lastname}</h2>
                                    <span className={lato.className}>{media?.media ? "Sent a Photo" : isEmpty(message) ? null : message.length > 20 ? `${message.slice(0, 20)}...` : `${message.slice(0, 20)}`}</span>
                                </div>
                            </div>
                            {isRead || sendUser?.userID === user?.id ? null : <div className={styles.active} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
