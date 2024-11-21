import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/workModule.module.scss';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { CreateWorkExperienceValidationSchema } from '@/validations/workExperience';
import { CreateMyPortfolio } from '@/util/Mutation/portoflio.mutation';
import { ButtonIconToggle, CancelBtn, PrimaryButton } from '@/components/button';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import { TbPlus, TbX } from 'react-icons/tb';
import { CheckboxV2 } from '@/components/checkbox';
import { InputV1 } from '@/components/input';
import Spinner from '@/components/spinner';
import Form from '@/components/form';
import Label from '@/components/label';
import Textarea from '@/components/textarea';
import SelectForm from '@/components/select';
import toast from 'react-hot-toast';
import SpanError from '@/components/Error/spanError';
import { monthsArray } from '@/util/calendar';
import { queryClient } from '@/lib/provider';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { SkillsPagination } from '@/util/Query/skills.query';


export type YearList = {
    years: number[]
}

export default function WorkModule({ value, setValue, id }: any) {

    const [search, setSearch] = useState("")
    const debounceSearch = useDebounce(search, 1000)


    const { data: SkillData } = useQuery({
        queryKey: ["GetSkills", debounceSearch],
        queryFn: async () => {
            const { skillsPagination } = await GraphQLRequest(SkillsPagination, {
                search: search,
                input: {
                    take: 20, page: 1
                }
            })

            return skillsPagination
        }
    })

    const locationType = [
        { name: "On-site", value: "On-Site" },
        { name: "Remote", value: "Remote" },
        { name: "Hybrid", value: "Hybrid" }
    ]

    const jobType = [
        { name: "Full-Time", value: "Full-Time" },
        { name: "Part-Time", value: "Part-Time" },
        { name: "Contract", value: "Contract" },
        { name: "Freelance", value: "Freelance" },
        { name: "Internship", value: "Internship" },
        { name: "Apprenticeship", value: "Apprenticeship" },
        { name: "Seasonal", value: "Seasonal" },
    ]

    const [mutation, { data, loading }] = useMutation(CreateMyPortfolio)

    const [yearList, setYearList] = useState<YearList>({ years: [] })


    useEffect(() => {
        const currentYear = new Date().getFullYear() + 1;

        const yearsInArray = Array.from({ length: 100 }, (_, i) => currentYear - 1 - i);

        setYearList({ years: yearsInArray })
    }, [])

    const { values, errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue, resetForm } = useFormik({
        initialValues: {
            title: "",
            description: "",
            companyName: "",
            employmentType: "",
            working: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            location: "",
            locationType: "",
            skills: []
        },
        validationSchema: CreateWorkExperienceValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            mutation({
                variables: {
                    profileId: id,
                    input: {
                        title: values.title,
                        description: values.description,
                        companyName: values.companyName,
                        employmentType: values.employmentType,
                        location: values.location,
                        locationType: values.locationType,
                        startMonth: values.startMonth,
                        startYear: values.startYear,
                        endMonth: values.endMonth,
                        endYear: values.endYear
                    },
                    skills: values.skills
                },
                onCompleted: (data) => {
                    if (data.createPortfolio.portfolioID) {
                        toast.success("Successfully Added")
                        queryClient.invalidateQueries({
                            queryKey: ["WorkExperience"]
                        })
                        resetForm()
                    }
                    setSubmitting(false)
                }
            })
        }
    })


    const onHandleLocatioNType = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue("locationType", e.target.value)
    }

    const onHandleEmploymenType = (e: ChangeEvent<HTMLInputElement>) => {
        setFieldValue("employmentType", e.target.value)
    }
    return (
        <div className={styles.container}>
            <div className={styles.workContainer}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}>Add Work Experience</h2>
                    <ButtonIconToggle icon={<TbX size={23} />} value={value} setValue={setValue} />
                </div>
                <Form onSubmit={handleSubmit}>
                    {
                        <div className={styles.body}>
                            <Label name="Title" required={true} />
                            <InputV1
                                name='title'
                                onChange={handleChange}
                                placeholder='Title'
                                type='text'
                                value={values.title}
                                errors={errors.title}
                                touched={touched.title}
                            />
                            <Label name="Description" required={true} />
                            <Textarea name='description' onChange={handleChange} placeholder='Description' value={values.description} errors={errors.description} touched={touched.description} />
                            <Label name="Company Name" required={true} />
                            <InputV1
                                name='companyName'
                                onChange={handleChange}
                                placeholder='Company Name'
                                type='text'
                                value={values.companyName}
                                errors={errors.companyName}
                                touched={touched.companyName}
                            />
                            <Label name='Employment Type' required={true} />
                            <SelectForm title='Please Select' size={jobType} onClick={onHandleEmploymenType} value={values.employmentType} errors={errors.employmentType} touched={touched.employmentType} />

                            <div className={styles.dateEmployment}>
                                <div className={styles.om}>
                                    <Label name='Start Date' required={true} />
                                    <div className={styles.ey}>
                                        <div className={styles.seleteye}>
                                            <select name="startMonth" value={values.startMonth} onChange={(e) => setFieldValue("startMonth", e.target.value)}>
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
                                            <select name="startYear" value={values.startYear} onChange={(e) => setFieldValue("startYear", e.target.value)}>
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

                                {values.working ? null
                                    : <div className={styles.om}>
                                        <Label name='End Date' required={true} />
                                        <div className={styles.ey}>
                                            <div className={styles.seleteye}>
                                                <select
                                                    name="endMonth"
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
                                                <select name="endYear" value={values.endYear} onChange={(e) => setFieldValue("endYear", e.target.value)}>
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
                                    </div>}
                            </div>

                            <div className={styles.currently}>
                                <CheckboxV2 value={values.working} onChange={handleChange} name='working' />
                                <Label name='I am currently working on this role' required={false} />
                            </div>
                            <Label name='Location' required={true} />
                            <InputV1
                                name='location'
                                onChange={handleChange}
                                placeholder='Location'
                                type='text'
                                value={values.location}
                                errors={errors.location}
                                touched={touched.location}
                            />
                            <Label name='Location Type' required={true} />
                            <SelectForm title='Please Select' size={locationType} value={values.locationType} onClick={onHandleLocatioNType} errors={errors.locationType} touched={touched.locationType} />
                            <div className={styles.skills}>
                                <Label name="Skills" required={true} />
                                <input type="search" placeholder='search javascript, typescript, videographer, virtual assistant, content creator, and etc' onChange={(e) => setSearch(e.target.value)} value={search} className={styles.searchBox} />
                                <div className={styles.skillsContainer}>
                                    {
                                        SkillData?.item?.map(({ skillsID, skills }: { skillsID: never, skills: never }) => (
                                            <button className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button" key={skillsID}
                                                onClick={(e) => {

                                                    const updatedSkills = values.skills.includes(e.currentTarget.value as never)
                                                        ? values.skills.filter((a: any) => a !== e.currentTarget.value)
                                                        : [...values.skills, e.currentTarget.value];

                                                    setFieldValue("skills", updatedSkills);
                                                }}
                                            >
                                                <TbPlus size={18} />
                                                <span className={MediumPoppins.className}>{skills}</span>
                                            </button>
                                        ))
                                    }
                                </div>

                            </div>
                            {errors.skills && touched.skills ? <SpanError message={errors.skills} /> : null}
                        </div>
                    }
                    <div className={styles.footer}>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </div>
                </Form>

            </div >
        </div >
    )
}
