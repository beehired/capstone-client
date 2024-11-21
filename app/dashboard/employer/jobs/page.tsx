import React from 'react'
import styles from '@/styles/dashboard/job/page.module.scss';
import JobBody from '@/components/dashboard/job/body';
import { Metadata } from 'next';
import BodyTemplate from '@/components/dashboard/template';


export const metadata: Metadata = {
    title: "Dashboard | Job Post",
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
        <BodyTemplate title="Job Post">
            <JobBody />
        </BodyTemplate>
    )
}
