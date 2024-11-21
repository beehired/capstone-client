import ProfileAbout from '@/components/dashboard/applicant/profile/profileTab/about'
import ProfileDesign from '@/components/dashboard/applicant/profile/profileTab/design'
import ProfileExperience from '@/components/dashboard/applicant/profile/profileTab/experience'
import ProfileSocial from '@/components/dashboard/applicant/profile/profileTab/social'
import Default from '@/components/dashboard/applicant/themes/default'
import React from 'react'


type Props = {
    params: { prof: string, id: string }
    searchParams: { prof: string, id: string }
}

export const generateMetadata = async () => {
    return {
        title: "My Profile",
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
}

export default function Page({ params, searchParams }: Props) {

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ width: "800px" }}>
                {params.prof === "about" && <ProfileAbout id={params.id} />}
                {params.prof === "social" && <ProfileSocial id={params.id} />}
                {params.prof === "experience" && <ProfileExperience id={params.id} />}
                {params.prof === "design" && <ProfileDesign id={params.id} />}
            </div>
            <div style={{ width: "100%", }}>
                <Default id={params.id} />
            </div>
        </div>
    )
}
