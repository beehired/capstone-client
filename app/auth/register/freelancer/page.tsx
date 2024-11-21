import dynamic from 'next/dynamic';

const Freelancer = dynamic(() => import("@/components/auth/freelancer"), {
    ssr: false
})


import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Register - Freelancer",
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
    }
}

export default function Page() {
    return (
        <div>
            <Freelancer />
        </div>
    )
}
