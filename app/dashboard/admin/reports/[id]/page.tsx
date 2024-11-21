import ReportPage from '@/components/dashboard/admin/reports/reportPage'
import BodyTemplate from '@/components/dashboard/template'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Reports",
    creator: "UST-CICS Group 7 BeeHired",
    icons: "@/app/favicon.ico",
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




export default function Page() {

    return (
        <BodyTemplate title='' goback={true}>
            <ReportPage />
        </BodyTemplate>
    )
}
