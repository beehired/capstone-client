"use client"


import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { VerifyMyAccount } from '@/util/Mutation/auth.mutation'
import { RouteButtonV2 } from '@/components/button'

export default function Page() {

    const search = useSearchParams()
    const router = useRouter();


    const [mutate] = useMutation(VerifyMyAccount)

    useEffect(() => {
        mutate({
            variables: {
                userId: search.get("userid")
            },
            onCompleted: (data) => {
                router.push("/auth/login")
            }
        })
    })

    return (
        <div>
        </div>
    )
}
