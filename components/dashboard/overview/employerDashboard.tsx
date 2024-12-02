"use client"

import React from 'react'
import styles from '@/styles/dashboard/dashboard/dashboard.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetEmployerDashboard } from '@/util/Query/dashboard.query';
import store from 'store2';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, ArcElement } from "chart.js";
import { Bar } from 'react-chartjs-2'
import HeaderCount from './headerCount';
import { useRouter, useSearchParams } from 'next/navigation'
import { RegularPoppins } from '@/components/typograhy';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';


ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, ArcElement,
    BarElement,
    Legend);


export default function EmployerDashboard() {

    const sp = useSearchParams();
    const router = useRouter();
    const user = store.get("UserAccount");

    const { data, isLoading } = useQuery({
        queryKey: ["EmployerDashboardQuery", user?.user.company.companyID],
        queryFn: async () => {
            const { getEmployerDashboardQuery } = await GraphQLRequest(GetEmployerDashboard, {
                companyId: user?.user.company.companyID
            })

            return getEmployerDashboardQuery
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderCount name='Total Job Posts' count={data?.JobPost} />
                <HeaderCount name='Total Schedule' count={data?.schedule} />
                <HeaderCount name='Total Applicants Applied' count={data?.applicants} />
                <HeaderCount name='Total Projects' count={data?.projects} />
            </div>
            <div className={styles.overviewData}>
                <div className={styles.weekBtn}>
                    <div className={styles.con}>
                        <button aria-label="button" className={sp.get("filter") === "week" ? styles.active : ""} onClick={() => router.push('/dashboard/employer/overview?filter=week')}>
                            <span className={RegularPoppins.className}>Week</span>
                        </button>
                        <button aria-label="button" className={sp.get("filter") === "month" ? styles.active : ""} onClick={() => router.push('/dashboard/employer/overview?filter=month')}>
                            <span className={RegularPoppins.className}>Month</span>
                        </button>
                    </div>
                </div>
                <div style={{ height: "500px", width: "100%" }}>

                    {isEmpty(data?.getMyJobPost) ? <NotAvailable /> :
                        <Bar
                            datasetIdKey='0'
                            height={20}
                            options={{
                                maintainAspectRatio: false,
                            }}
                            data={{
                                datasets: data?.getMyJobPost?.map(({ applicants, jobTitle }: any) => ({
                                    label: jobTitle.title,
                                    borderColor: "#244173",
                                    backgroundColor: "#fdd700",
                                    data: {
                                        "": applicants
                                    }
                                }))
                            }}
                        />
                    }


                </div>
            </div>
        </div>
    )
}
