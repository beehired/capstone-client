import BodyTemplate from '@/components/dashboard/template'
import React from 'react'
import SkillsMaintenance from '@/components/dashboard/admin/maintenance/skills'
import { Metadata } from 'next'
import styles from '@/styles/dashboard/admin/skills.module.scss'


export const metadata: Metadata = {
    title: "Skills",
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
        <BodyTemplate title='Skills' goback={true}>
            <SkillsMaintenance />
        </BodyTemplate>
    )
}
