"use client"

import React from 'react'
import Default from '../themes/default'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetUserByProfileId } from '@/util/Query/profile.query'
import LinkedIn from '../themes/linkedin'

export default function BeePage({ id }: any) {

    const { data, isLoading } = useQuery({
        queryKey: ["GetUserProfileById", id],
        queryFn: async () => {
            const { getUserProfileById } = await GraphQLRequest(GetUserByProfileId, {
                profileId: id
            })

            return getUserProfileById
        },
        refetchInterval: 1000
    })


    return (
        <div>
            {data?.getMyTheme.theme === "Default Theme" ? <Default id={id} /> : <LinkedIn id={id} />}
        </div>
    )
}
