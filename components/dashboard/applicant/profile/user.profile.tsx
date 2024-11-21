import React from 'react'
import styles from '@/styles/dashboard/applicant/user.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyUserProfile } from '@/util/Query/user.query';
import store from 'store2';
import { RegularPoppins } from '@/components/typograhy';
import Spinner from '@/components/spinner';
import Image from 'next/image';
import DefaultImage from '@/app/public/l60Hf.png';
import { isEmpty } from 'lodash';

export default function UserProfile() {


    const user = store.get("UserAccount");

    const { data, isLoading } = useQuery({
        queryKey: ["UserProfile"],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id
            })
            return getProfileByUser
        }
    })
    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> : <>
                <div className={styles.avatar}>
                    <Image src={isEmpty(data?.avatar?.media) ? DefaultImage : data?.avatar.media} alt="" height={44} width={60} priority blurDataURL={data?.avatar?.media} />
                </div>
                <div className={styles.info}>

                    <span className={`${RegularPoppins.className}`}>{data?.firstname} {data?.lastname ? data?.lastname[0] : null}.</span>

                    <span className={`${RegularPoppins.className} ${styles.role}`}>Freelancer</span>
                </div>
            </>}
        </div>
    )
}
