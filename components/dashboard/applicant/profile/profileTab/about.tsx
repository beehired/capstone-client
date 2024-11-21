"use client"


import React, { useState } from 'react'
import Avatar from './about/avatar'
import ProfileTemplate from '../template'
import About from './about/about'
import AboutModule from './module/about.module'
import Dialog from '@/components/dialog'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetMyAboutByProfileID } from '@/util/Query/about.query'
import { useQuery } from '@tanstack/react-query'
import Skill from './about/skill'
import SkillModule from './module/skills.module'
import ProfileHeader from './about/header'

export default function ProfileAbout({ id }: { id: string }) {

    const [aboutToggle, setAboutToggle] = useState(false);
    const [skillsToggle, setSkillToggle] = useState(false)

    const { data: AboutData } = useQuery({
        queryKey: ["ProfileAbout"],
        queryFn: async () => {
            const { getAboutByProfileID } = await GraphQLRequest(GetMyAboutByProfileID, {
                profileId: id
            })

            return getAboutByProfileID
        }
    })

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {
                aboutToggle ?
                    <Dialog>
                        <AboutModule id={id} value={aboutToggle} setValue={setAboutToggle} />
                    </Dialog> : null
            }
            {
                skillsToggle ?
                    <Dialog>
                        <SkillModule id={id} value={skillsToggle} setValue={setSkillToggle} />
                    </Dialog> : null
            }
            <Avatar id={id} />
            <ProfileTemplate title="Header" icon={false}>
                <ProfileHeader id={id} />
            </ProfileTemplate>
            <ProfileTemplate title='About' icon={AboutData ? false : true} value={aboutToggle} setValue={setAboutToggle}>
                <About id={id} />
            </ProfileTemplate>
            <ProfileTemplate title='Skills' icon={true} value={skillsToggle} setValue={setSkillToggle}>
                <Skill id={id} />
            </ProfileTemplate>
        </div>
    )
}
