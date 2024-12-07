"use client"

import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetUserByProfileId } from '@/util/Query/profile.query'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import store from 'store2'
import Default from './default'
import Spinner from '@/components/spinner'
import LinkedIn from './linkedin'
import { isEmpty } from 'lodash'

export default function Preview() {

    const user = store.get("UserAccount")
    const id = user?.user?.myProfile?.profileID;

    const { data, isLoading } = useQuery({
        queryKey: ["GetUserProfileById", id],
        queryFn: async () => {
            const { getUserProfileById } = await GraphQLRequest(GetUserByProfileId, {
                profileId: id
            })

            return getUserProfileById
        },
    })



    return (
        <div style={{ width: "100%" }}>
            {isEmpty(data?.getMyTheme?.theme) ? null : data?.getMyTheme.theme === "Default Theme" ? <Default id={id} /> : <LinkedIn id={id} />
            }
        </div>
    )
}
