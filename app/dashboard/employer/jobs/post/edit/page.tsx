import JobForm from '@/components/dashboard/job/jobform';
import BodyTemplate from '@/components/dashboard/template';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetJobPostID } from '@/util/Query/job.query'
import { ResolvingMetadata } from 'next'
import React from 'react'


type Props = {
    searchParams: { id: string }
}

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata) {


    const data = await GraphQLRequest(GetJobPostID, {
        jobPostId: searchParams.id
    })

    return {
        title: data?.getJobPostById.title,
        description: data?.getJobPostById.description,
        favicon: "@/favicon.ico",
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

export default function Page({ searchParams }: Props) {
    return (
        <BodyTemplate title="" goback={true}>
            <JobForm id={searchParams.id} />
        </BodyTemplate>
    )
}
