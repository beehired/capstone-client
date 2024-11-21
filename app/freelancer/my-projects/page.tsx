import React from 'react'
import { Metadata } from 'next';
import dynamic from 'next/dynamic'

const Project = dynamic(() => import('@/components/dashboard/applicant/projects/projects'), {
    ssr: false
})

export const metadata: Metadata = {
    title: "My Projects",
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
        <Project />
    )
}
