import GotoLink from '@/components/dashboard/applicant/gotolink'
import ProfileTab from '@/components/dashboard/applicant/profile/profileTab/profileTab'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function Template({ children }: Props) {


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ProfileTab />
            <GotoLink />
            {children}
        </div>
    )
}
