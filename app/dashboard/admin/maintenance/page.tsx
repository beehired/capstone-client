import React from 'react'
import { Metadata } from 'next'
import styles from '@/styles/dashboard/admin/maintenance.module.scss'
import BodyTemplate from '@/components/dashboard/template'
import { RegularPoppins } from '@/components/typograhy'
import { RouteButtonV2 } from '@/components/button'

export const metadata: Metadata = {
    title: "Maintenance",
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

const maintenanceLink = [
    { name: "Skills", url: "/dashboard/admin/maintenance/skills" },
    { name: "User", url: "/dashboard/admin/maintenance/user" },
    { name: "Themes", url: "/dashboard/admin/maintenance/themes" },
    { name: "Fonts", url: "/dashboard/admin/maintenance/fonts" }
]

export default function Page() {
    return (
        <div className={styles.container}>
            <BodyTemplate title='Maintenance'>
                <div className={styles.maintenanceBody}>
                    {maintenanceLink.map(({ name, url }) => (
                        <div key={name} className={styles.maintenanceCard}>
                            <div>
                                <h2 className={RegularPoppins.className}>{name}</h2>
                            </div>
                            <div>
                                <RouteButtonV2 name='View More' url={url} />
                            </div>
                        </div>
                    ))}
                </div>
            </BodyTemplate>
        </div>
    )
}
