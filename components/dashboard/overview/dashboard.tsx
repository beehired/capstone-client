"use client"


import React, { useState } from 'react'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { AdminDashboard } from '@/util/Query/dashboard.query'
import { useQuery } from '@tanstack/react-query'
import styles from '@/styles/dashboard/dashboard/dashboard.module.scss'
import HeaderCount from './headerCount'
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, ArcElement } from "chart.js";
import { Bar } from 'react-chartjs-2'
import { useSearchParams, useRouter } from 'next/navigation'
import { RegularPoppins } from '@/components/typograhy'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'
import { TbCloudDownload } from 'react-icons/tb'
import { CSVLink } from 'react-csv'


ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, ArcElement,
    BarElement,
    Legend);



const headers = [
    { label: "Total Employers", key: "employers" },
    { label: "Total Job Posting", key: "job" },
    { label: "Total Users", key: "users" },
]

export default function Dashboard() {
    const sp = useSearchParams();
    const router = useRouter();


    const [generateToggle, setGenerateToggle] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["DashboardQuery", sp.get("filter")],
        queryFn: async () => {
            const { getDashboardQuery } = await GraphQLRequest(AdminDashboard, {
                filter: sp.get("filter")
            })
            return getDashboardQuery
        }
    })

    const onHandleToggleGenerateReport = () => {
        setGenerateToggle(() => !generateToggle)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderCount name='Total Users' count={data?.users} />
                <HeaderCount name='Total Job Posts' count={data?.jobpost} />
                <HeaderCount name='Total Applications' count={data?.applicants} />
                <HeaderCount name='Reports' count={data?.report} />
            </div>
            <div className={styles.overviewData} >
                <div className={styles.headData}>
                    <div className={styles.weekBtn}>
                        <div className={styles.con}>
                            <button className={sp.get("filter") === "week" ? styles.active : ""} onClick={() => router.push('/dashboard/admin/overview?filter=week')}>
                                <span className={RegularPoppins.className}>Week</span>
                            </button>
                            <button className={sp.get("filter") === "month" ? styles.active : ""} onClick={() => router.push('/dashboard/admin/overview?filter=month')}>
                                <span className={RegularPoppins.className}>Month</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.generateReport}>
                        <CSVLink
                            className={styles.generateReportBtn}
                            headers={headers}
                            filename='BeeHired Generate Report'
                            data={[{
                                employers: data?.company,
                                users: data?.users,
                                job: data?.jobpost

                            }]} onClick={onHandleToggleGenerateReport}>
                            <TbCloudDownload size={20} />
                            <span className={RegularPoppins.className}>
                                Generate Report
                            </span>
                        </CSVLink>
                    </div>
                </div>
                <div style={{ height: "500px", width: "100%" }}>

                    {isEmpty(data?.jobpostList) ? <NotAvailable /> : <Bar
                        datasetIdKey='0'
                        height={20}
                        options={{
                            maintainAspectRatio: false,
                        }}
                        data={{
                            datasets: data?.jobpostList?.map(({ applicants, jobTitle }: any) => ({
                                label: jobTitle.title,
                                borderColor: "#244173",
                                backgroundColor: "#fdd700",
                                data: {
                                    "": applicants
                                }
                            }))
                        }}
                    />}


                </div>
            </div>
        </div >
    )
}
