"use client"

import React, { useState } from 'react'
import ProfileTemplate from '../template'
import SocialLinks from './social/link'
import Dialog from '@/components/dialog'

export default function ProfileSocial({ id }: { id: string }) {
    return (
        <div style={{ height: "100vh" }}>

            <ProfileTemplate title='Social Links' icon={false}>
                <SocialLinks id={id} />
            </ProfileTemplate>
        </div>
    )
}
