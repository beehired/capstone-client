import FreelanceView from '@/components/dashboard/admin/freelancers/freelanceView'
import BodyTemplate from '@/components/dashboard/template'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetUserByUserId } from '@/util/Query/user.query'
import React from 'react'

type Props = {
    params: { id: string }
}
export const generateMetadata = async ({ params }: Props) => {

    const data = await GraphQLRequest(GetUserByUserId, {
        userId: params.id
    })

    return {
        title: `${data.getUserAccountById.myProfile.firstname} ${data.getUserAccountById.myProfile.lastname}`,
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
        <BodyTemplate title="" goback={true}>
            <FreelanceView id={id} />
        </BodyTemplate>
    )
}
