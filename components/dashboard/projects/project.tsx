"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/projects/project.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { TbSearch } from 'react-icons/tb';
import Pagination from '@/components/pagination';
import { useQuery } from '@tanstack/react-query';
import store from 'store2';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetCompany } from '@/util/Query/company';
import { GetMyProjectCompany } from '@/util/Query/project.query';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';
import ProjectCard from './projectCard';


export default function Projects() {

    const user = store.get("UserAccount")

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState("desc")
    const itemsPerPage = 20;

    const { data: CompanyProjectData } = useQuery({
        queryKey: ["GetMyCompanyProject", user?.user?.company.companyID, search, orderBy, page],
        queryFn: async () => {
            const { getCompanyProjects } = await GraphQLRequest(GetMyProjectCompany, {
                companyId: user?.user?.company?.companyID,
                input: {
                    take: itemsPerPage,
                    page
                },
                search,
                orderBy: orderBy
            })

            return getCompanyProjects
        }
    })

    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }

    const onHandleProjectSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.second}>
                    <div className={styles.sortbys}>
                        <span>Sort By:</span>
                        <select onChange={(e) => setOrderBy(e.target.value)}>
                            <option value="desc" className={RegularPoppins.className}>Newest</option>
                            <option value="asc" className={RegularPoppins.className}>Oldest</option>
                        </select>
                    </div>
                    <div className={styles.search}>
                        <TbSearch size={20} />
                        <input type='search' placeholder='Search' onChange={onHandleProjectSearch} />
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Title</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Amount</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Status</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Freelancer</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Date Created</div>
                        <div className={`${styles.th} ${RegularPoppins.className}`}>Action</div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {isEmpty(CompanyProjectData?.item) ? <NotAvailable /> : CompanyProjectData?.item.map(({ projectOrganizerID, title, status, startDate, description, endDate, amount, createdAt, user: { userID, myProfile: { firstname, lastname } } }: any) => (
                        <ProjectCard key={projectOrganizerID} title={title} status={status} startDate={startDate} endDate={endDate} amount={amount} date={createdAt} name={`${firstname} ${lastname}`} id={projectOrganizerID} description={description} freelancerID={userID} />
                    ))}
                </div>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={CompanyProjectData?.currentPage}
                hasNextPage={CompanyProjectData?.hasNextPage}
                hasPrevPage={CompanyProjectData?.hasPrevPage}
                totalItems={CompanyProjectData?.totalItems}
                totalPages={CompanyProjectData?.totalPages}
            />
        </div>
    )
}
