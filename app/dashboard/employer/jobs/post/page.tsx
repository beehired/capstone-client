import React from 'react'
import Job from '@/components/dashboard/job/view/job';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetJobPostID } from '@/util/Query/job.query';
import BodyTemplate from '@/components/dashboard/template';

type Props = {
    params: { id: string },
    searchParams: { id: string }
}

export async function generateMetadata({ searchParams }: Props) {


    const data = await GraphQLRequest(GetJobPostID, {
        jobPostId: searchParams.id
    })

    return {
        title: data?.getJobPostById?.title,
        description: data?.getJobPostById.description,
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
export default async function Page({ params, searchParams }: Props) {


    return (
        <BodyTemplate title="" goback={true}>
            <Job id={searchParams.id} />
        </BodyTemplate>
    )
}
