"use client"
import NotAvailable from '@/components/notavailable'
import styles from '@/styles/dashboard/applicant/profile/skill.module.scss'
import Spinner from '@/components/spinner'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetSkillByProfileID } from '@/util/Query/skills.query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import React from 'react'
import { TbX } from 'react-icons/tb'
import { RemovedSkillToProfileByID } from '@/util/Mutation/skill.mutation'
import toast from 'react-hot-toast'
import { queryClient } from '@/lib/provider'

export default function Skill({ id }: { id: string }) {

    const { data, isLoading } = useQuery({
        queryKey: ["GetProfileSkill"],
        queryFn: async () => {
            const { getSkillByProfileID } = await GraphQLRequest(GetSkillByProfileID,
                { profileId: id })
            return getSkillByProfileID
        }
    })

    const mutation = useMutation({
        mutationKey: ["DeleteProfileSkill"],
        mutationFn: async (inputValues: { skillsId: string, profileId: string }) => {
            return await GraphQLRequest(RemovedSkillToProfileByID, inputValues)
        },
        onSuccess: () => {
            toast.success("Skill removed")
            queryClient.invalidateQueries({
                queryKey: ["GetProfileSkill"]
            })
        }
    })
    return (
        <div className={styles.container}>


            {isEmpty(data) ? <NotAvailable /> : isLoading ? <Spinner /> :
                <div className={styles.cds} >
                    <div className={styles.grid}>
                        {data.map(({ skillsID, skills }: { skillsID: string, skills: string }) => (
                            <div className={styles.skillset} key={skillsID}>
                                <span>{skills}</span>
                                <button aria-label={skills} onClick={async () => {
                                    await mutation.mutateAsync({
                                        skillsId: skillsID,
                                        profileId: id
                                    })
                                }}>
                                    <TbX size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            }
        </div>
    )
}
