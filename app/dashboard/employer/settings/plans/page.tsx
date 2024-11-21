import PlansAndBillings from '@/components/dashboard/settings/plant-and-billings/plans'
import BodyTemplate from '@/components/dashboard/template'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Dashboard | Settings",
    creator: "UST-CICS Group 7 BeeHired",
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
    },
    icons: "@/favicon.ico"
}

export default function Page() {
    return (
        <BodyTemplate title='Plans and Billings'>
            <PlansAndBillings />
        </BodyTemplate>
    )
}
