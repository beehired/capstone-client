import dynamic from 'next/dynamic';

const Register = dynamic(() => import("@/components/auth/register"), {
    ssr: false
})
import React from 'react'
import { Metadata } from 'next'



export const metadata: Metadata = {
    title: "Register",
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
        <>
            <Register />
        </>
    )
}
