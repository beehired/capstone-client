"use client"


import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetAllFontFamily } from '@/util/Query/font.query'
import styles from '@/styles/dashboard/applicant/profile/design.module.scss';
import Spinner from '@/components/spinner';
import Card from './card';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import SpanError from '@/components/Error/spanError'


export default function DesignFonts({ errors, touched, name, handleChange, value }: any) {

    const { data, isLoading } = useQuery({
        queryKey: ["GetAllFonts"],
        queryFn: async () => {
            const { getAllFonts } = await GraphQLRequest(GetAllFontFamily, {
                pagination: {
                    take: 20,
                    page: 1
                }
            })

            return getAllFonts
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {isLoading ? <Spinner /> : isEmpty(data) ? <NotAvailable /> : data?.item.map(({ fontID, font, image }: { fontID: string, font: string, image: string }) => (
                    <Card key={fontID} id={fontID} name={font} image={image} s={name} handleChange={handleChange} value={value} />
                ))}
            </div>
            {errors && touched ? <SpanError message={errors} /> : null}
        </div>
    )
}
