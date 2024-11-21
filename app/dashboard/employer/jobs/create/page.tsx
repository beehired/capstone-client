import React from 'react'
import { Metadata } from 'next'
import JobForm from '@/components/dashboard/job/jobform'
import BodyTemplate from '@/components/dashboard/template'


export const metadata: Metadata = {
    title: "Job Post - Create",
    creator: "UST-CICS Group 7 BeeHired",
    icons: "./favicon.ico",
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
        <BodyTemplate title="Job Create" goback={true}>
            <JobForm />
        </BodyTemplate>
    )
}
