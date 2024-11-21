import Calendar from '@/components/dashboard/applicant/calendar/calendar'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "Calendar",
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



export default function Page() {
    return (
        <div>
            <Calendar />
        </div>
    )
}
