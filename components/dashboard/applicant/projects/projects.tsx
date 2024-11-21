"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/applicant/project/project.module.scss';
import ProjectTabs from './projectsTab';
import { useQuery } from '@tanstack/react-query';
import store from 'store2';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyProjectByUserId } from '@/util/Query/project.query';
import Pagination from '@/components/pagination';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import ProjectCard from './projectCard';
import { TbCloudDownload } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import GenerateReport from './generate';

export default function Project() {


    const user = store.get("UserAccount");
    const [value, setValue] = useState("Not Started");
    const itemsPerPage = 20;
    const [page, setPage] = useState(1);
    const [generateToggle, setGenerateToggle] = useState(false);


    const onHandleGenerateReport = () => {
        setGenerateToggle(() => !generateToggle)
    }

    const onHandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    const { data } = useQuery({
        queryKey: ["GetMyProjects", user?.id, value],
        queryFn: async () => {
            const { getUserProjectOrganizer } = await GraphQLRequest(GetMyProjectByUserId, {
                userId: user?.id,
                status: value,
                input: {
                    take: itemsPerPage,
                    page: page
                }
            })

            return getUserProjectOrganizer
        }
    })


    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }


    return (
        <div className={styles.container}>
            {
                generateToggle ?
                    <Dialog>
                        <GenerateReport onClose={onHandleGenerateReport} />
                    </Dialog> :
                    null
            }
            <div className={styles.generate}>
                <button onClick={onHandleGenerateReport}>
                    <TbCloudDownload size={20} />
                    <span className={RegularPoppins.className}>Generate Report</span>
                </button>
            </div>
            <ProjectTabs click={onHandleChangeValue} value={value} />
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Company Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Title</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Amount</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Start Date</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>End Date</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Action</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ projectOrganizerID, title, description, status, startDate, endDate, amount, company }: {
                        projectOrganizerID: string, title: string, status: string, startDate: any, endDate: any, amount: number, company: any, description: string
                    }) => (
                        <ProjectCard key={projectOrganizerID} projectOrganizerID={projectOrganizerID} company={company} amount={amount} startDate={startDate} endDate={endDate} title={title} status={status} description={description} />
                    ))}
                </div>
            </div>
            {data?.item.length < itemsPerPage ? null :
                <Pagination
                    currentPage={data?.currentPage}
                    hasNextPage={data?.hasNextPage}
                    hasPrevPage={data?.hasPrevPage}
                    itemsPerPage={itemsPerPage}
                    nextButton={NextPage}
                    prevButton={PrevPage}
                    totalItems={data?.totalItems}
                    totalPages={data?.totalPages}
                />}
        </div>
    )
}
