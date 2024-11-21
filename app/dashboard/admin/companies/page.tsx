import CompaniesList from '@/components/dashboard/admin/companies/page'
import BodyTemplate from '@/components/dashboard/template'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Companies",
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
        <div>
            <BodyTemplate title='Companies'>
                <CompaniesList />
            </BodyTemplate>
        </div>
    )
}
