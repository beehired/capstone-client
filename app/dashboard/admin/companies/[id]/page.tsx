import CompanyPage from '@/components/dashboard/admin/companies/compangePage'
import BodyTemplate from '@/components/dashboard/template'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { CompanySlug } from '@/util/Query/company'
import React from 'react'



type Props = {
    params: { id: string }
}

export const generateMetadata = async ({ params }: Props) => {

    const data = await GraphQLRequest(CompanySlug, {
        slug: params.id
    })

    return {
        title: data.getCompanySlug.companyName,
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
export default function CompaniesID({ params: { id } }: Props) {


    return (
        <BodyTemplate title="" goback={true}>
            <CompanyPage id={id} />
        </BodyTemplate>
    )
}
