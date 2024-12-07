import Image from 'next/image'
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/design.card.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetUserByProfileId } from '@/util/Query/profile.query';
import cn from '@/util/cn';
import store from 'store2';


export default function Card({ id, name, image, s, handleChange, value }: { id: string, name: string, image: string, s: string, handleChange: any, value: any }) {


    const user = store.get("UserAccount");

    const { data, isLoading } = useQuery({
        queryKey: ["GetUserProfileById", user?.user?.myProfile.profileID],
        queryFn: async () => {
            const { getUserProfileById } = await GraphQLRequest(GetUserByProfileId, {
                profileId: user?.user?.myProfile.profileID
            })

            return getUserProfileById
        },
    })


    return (
        <button aria-label={name} value={id} name={s} onClick={(e) => handleChange(s, id)} className={
            cn(
                value === id && `${styles.active}   ${styles.container}`,
                styles.container

            )
        }
        >
            <div className={styles.avatar}>
                <Image src={image} alt='' fill objectFit='contain' priority blurDataURL={image} />
            </div>
            <h2 className={RegularPoppins.className}>{name}</h2>
        </button >
    )
}
