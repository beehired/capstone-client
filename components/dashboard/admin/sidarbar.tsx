import React from 'react'
import styles from '@/styles/dashboard/admin/sidebar.module.scss';
import { TbAdjustmentsHorizontal, TbBuilding, TbDashboard, TbLayoutDashboard, TbReportAnalytics, TbUser, TbUsersGroup } from 'react-icons/tb';
import { ButtonIcon } from '@/components/button';
import { RegularPoppins } from '@/components/typograhy';
import AdminProfile from './profile';
export default function Sidebar() {


    const sidebar = [
        {
            name: "Overview", icon: <TbLayoutDashboard size={23} />, url: "/dashboard/admin/overview?filter=week"
        },
        {
            name: "Companies", icon: <TbBuilding size={23} />, url: "/dashboard/admin/companies"
        },
        {
            name: "Freelancers", icon: <TbUsersGroup size={23} />, url: "/dashboard/admin/freelancers"
        },
        {
            name: "Reports", icon: <TbReportAnalytics size={23} />, url: "/dashboard/admin/reports"
        },
        {
            name: "Maintenance", icon: <TbAdjustmentsHorizontal size={23} />, url: "/dashboard/admin/maintenance"
        },
    ]
    return (
        <div className={styles.container}>
            <div>
                <AdminProfile />
                {sidebar.map(({ name, url, icon }) => (
                    <ButtonIcon key={name} name={name} url={url} icon={icon} />
                ))}
            </div>
            <span>
                <span className={`${styles.version} ${RegularPoppins.className}`}>BeeHired - Version 0.1.0</span>
            </span>
        </div>
    )
}
