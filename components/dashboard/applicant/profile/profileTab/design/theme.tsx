"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllProfileTheme } from '@/util/Query/theme.query'
import styles from '@/styles/dashboard/applicant/profile/design.module.scss'
import Spinner from '@/components/spinner'
import Card from './card'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'
import SpanError from '@/components/Error/spanError'

export default function DesignTheme({ errors, touched, handleChange, name, value }: any) {


    const { data, isLoading } = useQuery({
        queryKey: ["GetAllThemes"],
        queryFn: async () => {
            const { getThemes } = await GraphQLRequest(GetAllProfileTheme, {
                pagination: {
                    take: 20,
                    page: 1
                }
            })

            return getThemes
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {isLoading ? <Spinner /> : isEmpty(data) ? <NotAvailable /> :
                    data?.item.map(({ themeID, theme, image }: { themeID: string, theme: string, image: string }) => (
                        <Card key={themeID} id={themeID} name={theme} image={image} handleChange={handleChange} s={name} value={value} />
                    ))}
            </div>

            {errors && touched ? <SpanError message={errors} /> : null}
        </div>
    )
}
