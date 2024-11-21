"use client"
import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/admin/skills.module.scss'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { SkillsPagination } from '@/util/Query/skills.query'
import SkillsCard from './skillscard'
import Pagination from '@/components/pagination'
import { useDebounce } from '@uidotdev/usehooks'
import Dialog from '@/components/dialog'
import Prompt from '@/components/prompt'
import { CancelBtn, PrimaryButton } from '@/components/button'
import { Skills } from '@/types/skills.type'
import { CreateSkill } from '@/util/Mutation/skill.mutation'
import { AddSkillsValidation } from '@/validations/skills'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import PromptStyles from "@/styles/components/prompt.module.scss"
import { InputV1 } from '@/components/input'
import ToastNotification from '@/components/notification'
import { queryClient } from '@/lib/provider'
import Search from '../../search'
import Spinner from '@/components/spinner'

export default function SkillsMaintenance() {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState(false)

    const debounceTerm = useDebounce(search, 100)
    const itemsPerPage = 20;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }
    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }
    const { data, isLoading } = useQuery({
        queryKey: ["GetSkills", page, debounceTerm],
        queryFn: async () => {
            const { skillsPagination } = await GraphQLRequest(SkillsPagination, {
                search,
                input: {
                    take: itemsPerPage,
                    page: page
                }
            })
            return skillsPagination
        }
    })

    const mutation = useMutation({
        mutationKey: ["AddSkills"],
        mutationFn: async (inputValues: Skills) => {
            return await GraphQLRequest(CreateSkill, inputValues)
        },
        onSuccess: async (data) => {
            if (data.createSkills.skillsID) {
                toast.success("Successfully Skill Added")
                queryClient.invalidateQueries({
                    queryKey: ["GetSkills"]
                })
                resetForm()
            }

            if (data.createSkills.code) {
                toast.error(data.createSkills.message)
            }
        }
    })



    const { values, errors, touched, handleSubmit, resetForm, handleChange, isSubmitting, } = useFormik({
        initialValues: {
            skills: ""
        },
        validationSchema: AddSkillsValidation,
        onSubmit: async (values, { setSubmitting }) => {

            await mutation.mutateAsync({
                input: {
                    skills: values.skills
                }
            })
            setSubmitting(false)
        }
    })


    return (
        <div className={styles.container}>

            {toggle ?
                <Dialog>
                    <Prompt title='Add New'>
                        <div className={PromptStyles.body}>
                            <InputV1 name='skills' value={values.skills} type='text' placeholder='e.g. adobe illustrator, photoshop, react, virtual assistant, etc' onChange={handleChange} errors={errors.skills} touched={touched.skills} />
                        </div>
                        <div className={PromptStyles.footer}>
                            {isSubmitting ? null : <CancelBtn onClose={onHandleToggle} />}
                            <form onSubmit={handleSubmit}>
                                {isSubmitting ? <Spinner /> : <PrimaryButton name='Submit' loading={isSubmitting ? true : false} type='submit' />}
                            </form>
                        </div>

                        <ToastNotification />
                    </Prompt>

                </Dialog> : null}
            <div className={styles.header}>
                <Search onChange={onHandleChange} />
                <button onClick={() => setToggle(() => !toggle)}>
                    <span className={RegularPoppins.className}>
                        Add New
                    </span>
                </button>
            </div>
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Date Created</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Actions</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {
                        isLoading ? <Spinner /> : data?.item?.map(({ skillsID, skills, createdAt }: { skillsID: string, skills: string, createdAt: any }) => (
                            <SkillsCard key={skillsID} id={skillsID} skills={skills} createdAt={createdAt} />
                        ))
                    }
                </div>

            </div>

            <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={data?.currentPage}
                hasNextPage={data?.hasNextPage}
                hasPrevPage={data?.hasPrevPage}
                totalItems={data?.totalItems}
                totalPages={data?.totalPages} />

        </div>
    )
}
