"use client"
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetUserByUserId } from '@/util/Query/user.query';
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import store from 'store2'
import styles from '@/styles/dashboard/settings/profile.module.scss'
import DefaultImage from '@/app/public/l60Hf.png'
import Image from 'next/image'
import { isEmpty } from 'lodash';
import { RegularPoppins } from '@/components/typograhy';
import Dialog from '@/components/dialog';
import AvatarModule from '../Avatar/avatar';
import { TbEdit } from 'react-icons/tb';
import EditEmail from './profile/editEmail';
import Spinner from '@/components/spinner';

export default function ProfileSettings() {


    const user = store.get("UserAccount");

    const [addAvatar, setAddAvatar] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["GetUserProfile", user?.id],
        queryFn: async () => {
            const { getUserAccountById } = await GraphQLRequest(GetUserByUserId, {
                userId: user?.id
            })

            return getUserAccountById
        }
    })



    const onHandleAddAvatar = () => {
        setAddAvatar(() => !addAvatar)
    }

    const onHandleEditEmail = () => {
        setEditEmail(() => !editEmail)
    }
    return (
        <div className={styles.container}>
            {
                addAvatar ? <Dialog>
                    <AvatarModule value={addAvatar} setValue={setAddAvatar} id={user?.user?.myProfile.profileID} />
                </Dialog> : null
            }
            {
                editEmail ?
                    <Dialog>
                        <EditEmail close={onHandleEditEmail} />
                    </Dialog> : null
            }
            {isLoading ? <Spinner /> :
                <>
                    <div className={styles.avatar}>
                        <div className={styles.avatarPic}>
                            <Image src={isEmpty(data?.myProfile?.avatar?.media) ? DefaultImage : data?.myProfile?.avatar?.media} alt="" fill objectFit='cover' objectPosition='center' />
                        </div>
                        <div>
                            <button onClick={onHandleAddAvatar}>
                                <span className={RegularPoppins.className}>Change Profile Picture</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.EmailAddress}>
                        <h2>Emaill Address</h2>
                        <div className={styles.email}>
                            <span className={RegularPoppins.className}>{data?.email}</span>
                            <button onClick={onHandleEditEmail}>
                                <TbEdit size={20} />
                            </button>
                        </div>
                        <span className={`${RegularPoppins.className} ${styles.warning}`}>When updating your email address, email verification will be required. You will be automatically logged out, and you{"'"}ll need to verify your new email address to continue</span>
                    </div>
                </>
            }
        </div>
    )
}
