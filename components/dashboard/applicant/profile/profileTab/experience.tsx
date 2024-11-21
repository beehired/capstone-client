"use client"

import React, { useState } from 'react'
import ProfileTemplate from '../template'
import Resume from './experience/resume'
import WorKExperience from './experience/work'
import Dialog from '@/components/dialog'
import Education from './experience/education'
import WorkModule from './module/work.module'
import EducationModule from './module/education.module'

export default function ProfileExperience({ id }: any) {


    const [workToggle, setWorkToggle] = useState(false);
    const [educationtoggle, setEducationToggle] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {
                workToggle ?
                    <Dialog>
                        <WorkModule value={workToggle} setValue={setWorkToggle} id={id} />
                    </Dialog>
                    : null
            }
            {
                educationtoggle ?
                    <Dialog>
                        <EducationModule value={educationtoggle} setValue={setEducationToggle} id={id} />
                    </Dialog> : null
            }
            <ProfileTemplate title='Resume' icon={false}>
                <Resume id={id} />
            </ProfileTemplate>
            <ProfileTemplate
                title='Work Experience'
                icon={true}
                value={workToggle}
                setValue={setWorkToggle} >
                <WorKExperience id={id}
                />
            </ProfileTemplate>
            <ProfileTemplate
                title='Education Background'
                icon={true} value={educationtoggle}
                setValue={setEducationToggle} >
                <Education id={id} />
            </ProfileTemplate>
        </div>
    )
}
