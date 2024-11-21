import React from 'react'
import Head from 'next/head'
import { Metadata } from 'next'
import BodyTemplate from '@/components/dashboard/template'
import EmployerDashboard from '@/components/dashboard/overview/employerDashboard'

export const metadata: Metadata = {
    title: "Dashboard | Overview",
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
    icons: "./favicon.ico"
}

export default function Overview() {
    return (
        <BodyTemplate title='Overview'>
            <EmployerDashboard />
        </BodyTemplate>
    )
}
