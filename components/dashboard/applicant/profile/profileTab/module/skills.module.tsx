"use client"

import React, { SyntheticEvent, useState } from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/skillsModule.module.scss';
import { ButtonIconToggle, PrimaryButton } from '@/components/button';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import { useFormik } from 'formik';
import { TbPlus, TbX } from 'react-icons/tb';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetSkillByProfileID, SkillsPagination } from '@/util/Query/skills.query';
import NotAvailable from '@/components/notavailable';
import { isEmpty } from 'lodash';
import Spinner from '@/components/spinner';
import SpanError from '@/components/Error/spanError';
import Form from '@/components/form';
import ToastNotification from '@/components/notification';
import toast from 'react-hot-toast';
import { AddSkillToProfileByID } from '@/util/Mutation/skill.mutation';
import { queryClient } from '@/lib/provider';

export default function SkillModule({ id, value, setValue }: any) {


    const [search, setSearch] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["GetAllSkill", search],
        queryFn: async () => {
            const { skillsPagination } = await GraphQLRequest(SkillsPagination, {
                search,
                input: {
                    take: 20, page: 1
                }
            })

            return skillsPagination
        }
    })

    const { data: ProfileSkillData, isLoading: ProfileSkillLoading } = useQuery({
        queryKey: ["GetProfileSkill"],
        queryFn: async () => {
            const { getSkillByProfileID } = await GraphQLRequest(GetSkillByProfileID,
                { profileId: id })
            return getSkillByProfileID
        }
    })


    let asdsd: string[] = []

    ProfileSkillData?.map(({ skillsID, skills }: { skillsID: string, skills: string }) => {
        asdsd.push(skills)
    })



    const mutation = useMutation({
        mutationKey: ["CreatedProfileSkills"],
        mutationFn: async (inputValues: { skills: string[], profileId: string }) => {
            return await GraphQLRequest(AddSkillToProfileByID, inputValues)
        },
        onSuccess: (data) => {
            if (data.addSkillToProfile.profileID) {
                toast.success("Successfully Added")
                setValue(() => false)
                queryClient.invalidateQueries({
                    queryKey: ["GetProfileSkill"]
                })
            }
        }
    })

    const { handleSubmit, isSubmitting, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            skills: asdsd,
            profileId: id
        },
        onSubmit: async () => {
            await mutation.mutateAsync({
                profileId: values.profileId,
                skills: values.skills
            })
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.skillsContainer}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}>Add Profile Skills</h2>
                    <ButtonIconToggle icon={<TbX size={23} />} setValue={setValue} value={value} />
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.body}>

                        <div className={styles.skills}>
                            <input type="search" placeholder='search javascript, typescript, videographer, virtual assistant, content creator, and etc' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.searchBox} />
                            <div className={styles.sc}>
                                {

                                    isLoading ? <Spinner /> : isEmpty(data?.item) ?
                                        <button
                                            type="button"
                                            className={values.skills.includes(search as never) ? `${styles.active}` : ""}
                                            onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                                                const skillToToggle = e.currentTarget.value;

                                                if (values.skills.includes(skillToToggle as never)) {
                                                    const updatedSkills = values.skills.filter((a) => a !== skillToToggle);
                                                    setFieldValue("skills", updatedSkills);
                                                } else {
                                                    setFieldValue("skills", [...values.skills, skillToToggle]);
                                                }
                                            }}
                                            value={search}
                                        >
                                            {values.skills.includes(search as never) ?
                                                <TbX size={18} /> :
                                                <TbPlus size={18} />}
                                            <span className={MediumPoppins.className}>{search}</span>
                                        </button>

                                        : data?.item.map(({ skillsID, skills }: { skillsID: never, skills: never }) => (
                                            <button className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button" key={skillsID}
                                                onClick={(e) => {

                                                    const updatedSkills = values.skills.includes(e.currentTarget.value as never)
                                                        ? values.skills.filter((a: any) => a !== e.currentTarget.value)
                                                        : [...values.skills, e.currentTarget.value];

                                                    setFieldValue("skills", updatedSkills);
                                                }}>
                                                {values.skills.includes(skills) ?
                                                    <TbX size={18} /> :
                                                    <TbPlus size={18} />}
                                                <span className={MediumPoppins.className}>{skills}</span>
                                            </button>
                                        ))

                                }

                            </div>
                            {isEmpty(values.skills) ? null : <hr />}
                            <div className={styles.sc}>
                                {values.skills.map((skills) => (
                                    <button key={skills}
                                        className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button"
                                        onClick={(e) => {

                                            const updatedSkills = values.skills.includes(e.currentTarget.value as never)
                                                ? values.skills.filter((a: any) => a !== e.currentTarget.value)
                                                : [...values.skills, e.currentTarget.value];

                                            setFieldValue("skills", updatedSkills);
                                        }}
                                    >
                                        {values.skills.includes(skills) ?
                                            <TbX size={18} /> :
                                            <TbPlus size={18} />}
                                        <span className={MediumPoppins.className}>{skills}</span>
                                    </button>
                                ))}
                            </div>
                            {errors.skills && touched.skills ? <SpanError message={errors.skills} /> : null}
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </div>
                </Form>
            </div>
            <ToastNotification />
        </div>
    )
}
