"use client"

import React from 'react'
import styles from '@/styles/dashboard/sidebar.module.scss'
import { TbLayoutDashboard, TbCalendar, TbNotes, TbSettings, TbMessageCircle, TbTools, TbFileReport } from 'react-icons/tb'
import { ButtonIcon } from '../button'
import Company from './company/company'
import SidebarProfile from './sidebar/profile'
import { useQuery } from '@tanstack/react-query'
import store from 'store2'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetUnreadChat } from '@/util/Query/message.query'
import { RegularPoppins } from '../typograhy'

export default function Sidebar() {

    const user = store.get("UserAccount");


    const { data } = useQuery({
        queryKey: ["GetUnreadChat", user?.id],
        queryFn: async () => {
            const { getUnreadCountMessage } = await GraphQLRequest(GetUnreadChat, {
                userId: user?.id
            })
            return getUnreadCountMessage
        }
    })
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.company}>
                    <Company />
                </div>
                <div className={styles.links}>
                    <ButtonIcon name={'Overview'} url={"/dashboard/employer/overview?filter=week"} icon={<TbLayoutDashboard size={23} />} />
                    <ButtonIcon name={'Jobs'} url={"/dashboard/employer/jobs?archive=false"} icon={<TbNotes size={23} />} />
                    <div className={styles.mgs}>
                        {data ?
                            <div className={styles.messageNotif}>
                                <span className={RegularPoppins.className}>{data}</span>
                            </div> : null}
                        <ButtonIcon name={'Message'} url={"/dashboard/employer/message"} icon={<TbMessageCircle size={23} />} />
                    </div>
                    <ButtonIcon name={'Calendar'} url={"/dashboard/employer/calendar"} icon={<TbCalendar size={23} />} />
                    <ButtonIcon name={'Projects'} url={"/dashboard/employer/projects"} icon={<TbTools size={23} />} />
                    <ButtonIcon name={'Reviews'} url={"/dashboard/employer/reviews"} icon={<TbFileReport size={23} />} />
                    <ButtonIcon name={'Settings'} url={"/dashboard/employer/settings/accounts/profile"} icon={<TbSettings size={23} />} />
                </div>

            </div>
            <div>
                <SidebarProfile />
            </div>
        </div>
    )
}
