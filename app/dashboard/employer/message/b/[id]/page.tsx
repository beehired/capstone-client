import MessageView from '@/components/dashboard/job/message/message.view'
import { ApolloWrapper } from '@/lib/apolloWrapper'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Messages",
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
    icons: "@/app/favicon.ico"
}

export default function Page() {
    return (
        <div style={{ width: "100%" }}>
            <MessageView />
        </div>
    )
}
