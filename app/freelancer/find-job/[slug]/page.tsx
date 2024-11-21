import dynamic from 'next/dynamic'
const JobBody = dynamic(() => import('@/components/dashboard/applicant/job/body'), {
    ssr: false
})
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetJobPostID } from '@/util/Query/job.query'
import React from 'react'



type Props = {
    params: { slug: string }
}

export const generateMetadata = async ({ params }: Props) => {

    const data = await GraphQLRequest(GetJobPostID, {
        jobPostId: params.slug
    })

    return {
        title: data.getJobPostById.title,
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
export default function Page({ params: { slug } }: Props) {

    return (
        <div>
            <JobBody id={slug} />
        </div>
    )
}
