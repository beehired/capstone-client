"use client"


import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/dashboard/applicant/job/filtering.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import FilterContainer from './filterContainer';
import { durations, jobtype, experience } from '@/util/index'
import { CheckboxV2 } from '@/components/checkbox';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { SkillsPagination } from '@/util/Query/skills.query';
import Search from '../search';


export default function JobFiltering({ handleChange, setFieldValue, values, onHandleSearch }: any) {


    const [search, setSearch] = useState("");

    const { data: SkillData } = useQuery({
        queryKey: ["GetAllSkills", search],
        queryFn: async (): Promise<any> => {
            const { skillsPagination } = await GraphQLRequest(SkillsPagination, {
                search,
                input: {
                    take: 15,
                    page: 1
                }
            })

            return skillsPagination
        }
    })


    return (
        <div className={styles.container}>
            <Search onChange={onHandleSearch} />
            <FilterContainer title='Job Type'>
                {jobtype.map((jobType) => (
                    <div className={styles.childrenCard} key={jobType}>
                        <CheckboxV2 name='jobType' value={jobType} onChange={handleChange} />
                        <span className={RegularPoppins.className}>{jobType}</span>
                    </div>
                ))}
            </FilterContainer>
            <FilterContainer title='Duration'>
                {durations.map(({ name, value }) => (
                    <div className={styles.childrenCard} key={name}>
                        <CheckboxV2 value={value} name='duration' onChange={handleChange} />
                        <span className={RegularPoppins.className}>{name}</span>
                    </div>
                ))}
            </FilterContainer>
            <FilterContainer title='Experience Type'>
                {experience.map((experience) => (
                    <div className={styles.childrenCard} key={experience}>
                        <CheckboxV2 value={experience} name='experience' onChange={handleChange} />
                        <span className={RegularPoppins.className}>{experience}</span>
                    </div>
                ))}
            </FilterContainer>
            <FilterContainer title='Skills'>
                <input className={styles.searchInput} type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search skills here' />
                {
                    SkillData?.item

                        .map(({ skillsID, skills }: { skillsID: string, skills: string }) => (
                            <div className={styles.childrenCard} key={skillsID}>
                                <input
                                    className={styles.inputArray}
                                    type="checkbox"
                                    name="skills"
                                    onChange={(e) => {
                                        const skill = skills;
                                        if (e.target.checked) {
                                            setFieldValue("skills", [...values.skills, skill]);
                                        } else {
                                            setFieldValue("skills", values.skills.filter((s: string) => s !== skill));
                                        }
                                    }}
                                    checked={values.skills.includes(skills)}
                                />
                                <span className={RegularPoppins.className}>{skills}</span>
                            </div>
                        ))
                }
            </FilterContainer>
        </div>
    )
}
