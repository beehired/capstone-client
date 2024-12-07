import BeePage from '@/components/dashboard/applicant/bee/page'
import Default from '@/components/dashboard/applicant/themes/default'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetUserByProfileId } from '@/util/Query/profile.query'
import React from 'react'


type Props = {
    params: { id: string }
}


export const generateMetadata = async ({ params }: Props) => {

    const data = await GraphQLRequest(GetUserByProfileId, {
        profileId: params.id
    })

    return {
        title: `${data?.getUserProfileById?.firstname} ${data?.getUserProfileById?.lastname}`,
        creator: "UST-CICS Group 7 BeeHired",
        icons: "@/favicon.ico",
        authors: [
            { name: "Joshua Rembulat" },
            { name: "Gabrielle Joanna Marie Belgar" },
            { name: "Charlene Arlante" },
            { name: "Louis Ivan Virgo" },
        ],
        keywords: ["next js", "vercel", "heroku", "beehired", "hired", "freelance", "filipino", "filipino freelance"],
        openGraph: {
            type: "website",
            countryName: "Philippines",
            alternateLocale: "PH"
        }
    }
}

export default function Page({ params: { id } }: Props) {
    return (
        <div>
            <BeePage id={id} />
        </div>
    )
}
