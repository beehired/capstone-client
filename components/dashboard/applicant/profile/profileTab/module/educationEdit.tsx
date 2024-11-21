"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/educationModule.module.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { monthsArray } from '@/util/calendar'
import { useFormik } from 'formik'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { CreateValidationEducationBackground, UpdateValidationEducationBackground } from '@/validations/education'
import { Education, UpdateEducation } from '@/types/education'
import { CreateEducationBackground, UpdateEducationBackground } from '@/util/Mutation/education.mutation'
import toast from 'react-hot-toast'
import Form from '@/components/form'
import { RegularPoppins } from '@/components/typograhy'
import { ButtonIconToggle, PrimaryButton } from '@/components/button'
import { TbX } from 'react-icons/tb'
import SelectForm from '@/components/select'
import Label from '@/components/label'
import { InputV1 } from '@/components/input'
import SpanError from '@/components/Error/spanError'
import { queryClient } from '@/lib/provider'
import { GetEducationById } from '@/util/Query/eduication.query'
import Spinner from '@/components/spinner'
import { bachelorDegree } from '@/util'

export type YearList = {
    years: number[]
}


type EducationProps = {
    educationId: string
    degree: string
    school: string
    study: string
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
}

export default function EducationModule({ value, setValue, id }: any) {


    const { data: EducationData, isLoading } = useQuery({
        queryKey: ["EducationBackground", id],
        queryFn: async () => {
            const { getEducationById } = await GraphQLRequest(GetEducationById, {
                educationId: id
            })

            return getEducationById
        },
        enabled: !!id
    })




    const [yearList, setYearList] = useState<YearList>({ years: [] })

    useEffect(() => {
        const currentYear = new Date().getFullYear() + 1;
        const yearsInArray = Array.from({ length: 150 }, (_, i) => currentYear + 1 - i);

        setYearList({ years: yearsInArray })
    }, [])


    const mutation = useMutation({
        mutationKey: ["CreatedE.Background", id],
        mutationFn: async (inputValues: UpdateEducation) => {
            return await GraphQLRequest(UpdateEducationBackground, inputValues)
        },
        onSuccess: (data) => {
            if (data.updateEducationBackground.educationID) {
                toast.success("Successfully Updated")
                resetForm()
                queryClient.invalidateQueries({
                    queryKey: ["EducationBackgroud"]
                })
            }
        }
    })

    const { errors, touched, handleChange, handleSubmit, isSubmitting, values, setFieldValue, resetForm } = useFormik<EducationProps>({
        initialValues: {
            educationId: id,
            school: EducationData?.school,
            degree: EducationData?.degree,
            study: EducationData?.study,
            startMonth: EducationData?.startMonth,
            startYear: EducationData?.startYear,
            endMonth: EducationData?.endMonth,
            endYear: EducationData?.endYear
        },
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({
                educationId: values.educationId,
                input: {
                    degree: values.degree,
                    school: values.school,
                    endMonth: values.endMonth,
                    endYear: values.endYear,
                    startMonth: values.startMonth,
                    startYear: values.startYear,
                    study: values.study
                }
            })

            setSubmitting(false)
        }
    })


    const onHandleDegree = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue("degree", e.target.value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.educationContainer}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}>Edit Education Background</h2>
                    <ButtonIconToggle icon={<TbX size={23} />} setValue={setValue} value={value} />
                </div>
                <Form onSubmit={handleSubmit}>
                    {isLoading ? <Spinner /> : <>
                        <div className={styles.body}>
                            <Label name="School Name" required={true} />
                            <InputV1 value={values.school} name='school' type='text' placeholder='School Name' errors={errors.school} touched={touched.school} onChange={handleChange} />
                            <Label name="Study" required={true} />
                            <InputV1 value={values.study} name='study' errors={errors.study} touched={touched.study} onChange={handleChange} placeholder='e.g. Information Technology, Architecture, and etc' type='text' />
                            <Label name="Degree" required={true} />
                            <SelectForm errors={errors.degree} touched={touched.degree} value={values.degree}
                                size={bachelorDegree}
                                onClick={onHandleDegree} title='Please Select a Degree'
                            />
                            <div className={styles.dateEmployment}>
                                <div className={styles.om}>
                                    <Label name='Start Date' required={true} />
                                    <div className={styles.ey}>
                                        <div className={styles.seleteye}>
                                            <select value={values.startMonth} onChange={(e) => setFieldValue("startMonth", e.target.value)}>
                                                <option>-</option>
                                                {monthsArray.map((month) => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <div className={styles.errors}>
                                                {errors.startMonth && touched.startMonth ? <SpanError message={errors.startMonth} /> : null}
                                            </div>
                                        </div>
                                        <div className={styles.seleteye}>
                                            <select value={values.startYear} onChange={(e) => setFieldValue("startYear", e.target.value)}>
                                                <option>-</option>
                                                {yearList.years.map((year) => (
                                                    <option key={year}>{year}</option>
                                                ))}
                                            </select>
                                            <div className={styles.errors}>
                                                {errors.startYear && touched.startYear ? <SpanError message={errors.startYear} /> : null}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className={styles.om}>
                                    <Label name='End Date' required={true} />
                                    <div className={styles.ey}>
                                        <div className={styles.seleteye}>
                                            <select
                                                value={values.endMonth}
                                                onChange={(e) =>
                                                    setFieldValue("endMonth", e.target.value)}>
                                                <option>-</option>
                                                {monthsArray.map((month) => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <div className={styles.errors}>
                                                {errors.endMonth && touched.endMonth ? <SpanError message={errors.endMonth} /> : null}
                                            </div>
                                        </div>
                                        <div className={styles.seleteye}>
                                            <select value={values.endYear} onChange={(e) => setFieldValue("endYear", e.target.value)}>
                                                <option>-</option>
                                                {yearList.years.map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            <div className={styles.errors}>
                                                {errors.endYear && touched.endYear ? <SpanError message={errors.endYear} /> :
                                                    null
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.footer}>
                            <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                        </div>
                    </>}
                </Form>
            </div>
        </div>
    )
}
