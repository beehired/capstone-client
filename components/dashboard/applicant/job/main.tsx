"use client"

import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import JobFiltering from './filter'
import styles from '@/styles/dashboard/applicant/job/main.module.scss'
import Search from '../../search'
import JobPost from './jobPost'
import { useDebounce } from '@uidotdev/usehooks'
import { useFormik } from 'formik'
import Filter from './filter2'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetSkillByProfileID } from '@/util/Query/skills.query'
import { GetMyUserProfile } from '@/util/Query/user.query'
import { useQuery } from '@tanstack/react-query'
import store from 'store2'

export default function JobMain() {

    const user = store.get("UserAccount");

    const { data, isLoading } = useQuery({
        queryKey: ["GetSkill", user?.id],
        queryFn: async () => {
            const { getSkillByProfileID } = await GraphQLRequest(GetSkillByProfileID, {
                profileId: user?.user.myProfile.profileID
            })

            return getSkillByProfileID
        }
    })

    const [search, setSearch] = useState("");

    const debounce = useDebounce(search, 500)

    const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const skilled = useMemo(() => {
        const skillsArray: string[] = [];
        data?.forEach((item: { skills: string }) => {
            skillsArray.push(item.skills);
        });
        return skillsArray;
    }, [data]);

    useEffect(() => {
        data?.forEach((item: { skills: string }) => {
            return skilled.push(item.skills)
        })
    }, [data, skilled])


    const { handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            experience: [],
            duration: [],
            jobType: [],
            skills: skilled ?? [],
        },
        enableReinitialize: true,
        onSubmit: () => { }
    })

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <JobFiltering handleChange={handleChange} search={search} values={values} setFieldValue={setFieldValue} onHandleSearch={onHandleSearch} />
                <JobPost search={search} debounce={debounce} values={values} />
            </div>
        </div>
    )
}
