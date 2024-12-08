"use client"
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from '@/styles/auth/freelancer.module.scss'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
//Validations
import { FreelancerRegister } from '@/validations/registerSchema'

//Apollo Lib
import { useMutation } from '@apollo/client'
import { CreateFreelancerAcc } from '@/util/Mutation/user.mutation'

//icons
import { TbEye, TbLock, TbMail, TbEyeOff, TbChevronLeft, TbChevronRight, TbInfoCircle, TbPlus, TbX } from 'react-icons/tb'

//Components
import { InputV1, InputV2 } from '../input'
import { ButtonStepState, PrimaryButton } from '../button'
import { CheckboxV1 } from '../checkbox'
import { HrefLinkV2 } from '../link'
import Form from '../form'
import Label from '../label'
import Error from '../Error/error'
import SpanError from '../Error/spanError'
import SelectForm from '../select'
import { toast } from 'react-hot-toast'
import ToastNotification from '../notification'
import FileUploads from '../fileupload'

import { useQuery } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { SkillsPagination } from '@/util/Query/skills.query'
import { MediumPoppins } from '../typograhy'
import { useDebounce } from '@uidotdev/usehooks'
import { isEmpty } from 'lodash'
import Spinner from '../spinner'
import Dialog from '../dialog'
import TermsAndCondition from '../Policies/termsandagree'
export default function Freelancer() {

    const router = useRouter();
    const [step, setStep] = useState(1)
    const [onToggle, setToggle] = useState(false)
    const [search, setSearch] = useState("");

    const debounceSearch = useDebounce(search, 100)
    const onHandleIncrementStep = () => {
        setStep(() => step + 1)
    }

    const oHandleDecrementStep = () => {
        setStep(() => step - 1)
    }

    const [mutate] = useMutation(CreateFreelancerAcc)

    const validIDs = [
        { name: "National ID", value: "National ID" },
        { name: "Social Security System", value: "SSS ID" },
        { name: "Professional Regulatory Comisssion", value: "PRC ID" },
        { name: "Driver's License from Land Transportation Office", value: "Driver's License" },
        { name: "Overseas Workers Welfare Administration", value: "OWWA ID" },
        { name: "Department of Labor and Employment", value: "iDOLE ID" },
        { name: "Firearms License from Philippines National Police", value: "PNP ID" },
        { name: "Passport", value: "Passport" },
        { name: "PhilHealth ID", value: "PhilHealth Digitized PVC" }
    ]


    const { data, isLoading } = useQuery({
        queryKey: ["GetAllSkill", debounceSearch],
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

    const [fileUpload, setFileUpload] = useState(null)
    const { values, errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue, resetForm } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPass: "",
            TypeID: "",
            upload: "",
            skills: [],
            tnc: false

        },
        validationSchema: FreelancerRegister,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            mutate({
                variables: {
                    input: {
                        email: values.email,
                        password: values.password,
                        firstname: values.firstname,
                        lastname: values.lastname,
                    },
                    requirement: {
                        type: values.TypeID,
                    },
                    skills: values.skills,
                    fileUpload: fileUpload
                },
                onCompleted: (data) => {
                    if (data.createUserFreelancers.userID) {
                        toast.success("Successfully Created")
                        resetForm();
                        router.push('/auth/login')
                    }

                    if (data.createUserFreelancers.code) {
                        toast.error(data.createUserFreelancers.message)
                    }
                }
            })

            setSubmitting(false);
        }
    })
    const onHandleChangeTNC = () => {
        setFieldValue("tnc", true)
    }
    const onHandleValidID = (e: any) => {
        setFieldValue("TypeID", e.target.value)
    }

    return (
        <div className={styles.container}>
            {values.tnc ? null :
                <Dialog>
                    <TermsAndCondition accept={values.tnc} onChange={onHandleChangeTNC} />
                </Dialog>
            }
            <div className={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.si}>
                        {step === 1 ?
                            <>
                                <h2>Create an Account</h2>
                                <span>Welcome to BeeHired, your ultimate destination for unlocking new job opportunities. Creating an account with us allows you to showcase your portfolio and connect with recruiters eager to find talented freelancers like you.</span>
                            </> : null}

                        {step === 2 ?
                            <>
                                <h2>Identity Verification</h2>
                                <span>Your information will be secured under the <HrefLinkV2 name='Terms and Conditions' url='/terms-and-conditions' /> and <HrefLinkV2 name='Data Policy' url='/data-policy' /> of each respective party and to comply with the regulations of the relevant authority.
                                </span>
                                <div className={styles.ia}>

                                    <TbInfoCircle size={23} /> <span>Please ensure all details are correct and match your given personal information</span>
                                </div>
                            </>
                            : null}
                        {
                            step === 3 ? <div></div> : null
                        }
                    </div>

                    {step === 1 ? <>
                        <div className={styles.info}>
                            <div className={styles.om}>
                                <Label name="First Name" required={true} />
                                <InputV1 name='firstname' onChange={handleChange} placeholder='Firstname' type='text' value={values.firstname} errors={errors.firstname} touched={touched.firstname} />
                            </div>
                            <div className={styles.om}>
                                <Label name="Last Name" required={true} />
                                <InputV1 name='lastname' onChange={handleChange} placeholder='Lastname' type='text' value={values.lastname} errors={errors.lastname} touched={touched.lastname} />
                            </div>

                        </div>

                        <Label name='Email Address' required={true} />
                        <InputV1 icon={<TbMail size={23} />} name={'email'} placeholder={'Email Address'} type={'text'} value={values.email} onChange={handleChange} errors={errors.email} touched={touched.email} />
                        <Label name='Password' required={true} />
                        <InputV2
                            icon={<TbLock size={23} />}
                            icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                            toggle={onToggle} onToggle={setToggle}
                            name={'password'}
                            placeholder={'Password'}
                            type={onToggle ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Label name='Confirm Password' required={true} />
                        <InputV2
                            icon={<TbLock size={23} />}
                            icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                            toggle={onToggle} onToggle={setToggle}
                            name={'confirmPass'}
                            placeholder={'Confirm Password'}
                            type={onToggle ? "text" : "password"}
                            value={values.confirmPass}
                            onChange={handleChange}
                            errors={errors.confirmPass}
                            touched={touched.confirmPass}
                        />

                    </> : null}

                    {
                        step === 2 ? <>

                            <div className={styles.fileupload}>

                                <FileUploads setFieldValue={setFieldValue} value={values.upload} selectedFile={setFileUpload} dragisActive={'Drop your image'}
                                    isNotActive={'Drag your image here to upload or click to select a file. (JPEG, AVIF, PNG, JPG only)'} componentName='none' />
                                {errors.upload && touched.upload ? <SpanError message={errors.upload} /> : null}
                                <Label name='Government ID ' required={true} />
                                <SelectForm onClick={onHandleValidID} title='List of Philippines Valid IDs' size={validIDs} value={values.TypeID} errors={errors.TypeID} touched={touched.TypeID} />
                            </div>


                        </> :
                            null
                    }
                    {
                        step === 3 ? <>

                            <div className={styles.skills}>
                                <h2>Add Your Skill set</h2>
                                <span>Enhance your profile by selecting the skills you possess or want to highlight. This will enable recruiters to find the most suitable match for their needs.</span>
                                <input type="search" placeholder='search javascript, typescript, videographer, virtual assistant, content creator, and etc' onChange={(e) =>
                                    setSearch(e.target.value)
                                } value={search} className={styles.searchBox} />
                                <div className={styles.skillsContainer}>
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
                                                value={search} // Use the `search` value as the button's value
                                            >
                                                {values.skills.includes(search as never) ?
                                                    <TbX size={18} /> :
                                                    <TbPlus size={18} />}
                                                <span className={MediumPoppins.className}>{search}</span>
                                            </button>

                                            : data?.item.map(({ skillsID, skills }: { skillsID: never, skills: never }) => (
                                                <button
                                                    className={values.skills.includes(skills) ? `${styles.active}` : ""} name='skills' value={skills} type="button" key={skillsID}
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
                                <div className={styles.skillsContainer}>
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

                            <div className={styles.agreement}>
                                <CheckboxV1 name='tnc' checked={values.tnc} onChange={handleChange} />
                                <span>I agree to this <HrefLinkV2 name='Terms and Agreement' url='/policy/terms&condition' /> and   <HrefLinkV2 name='Data Policy' url='/policy/datapolicy' />.</span>
                            </div>
                            <div>
                                {errors.tnc && touched.tnc ? <SpanError message={errors.tnc} /> : null}
                            </div>
                        </> :
                            null
                    }
                    <div className={styles.btnStepContainer}>
                        {step === 1 ? null : <ButtonStepState disabled={step <= 1 ? true : false} name='Previous' onHandleClick={oHandleDecrementStep} icon={<TbChevronLeft size={18} />} />}
                        {step === 3 ? <PrimaryButton name='Submit' type='submit' loading={false} /> :
                            <ButtonStepState disabled={step >= 3 ? true : false} name='Next' onHandleClick={onHandleIncrementStep} icon2={<TbChevronRight size={18} />} />}

                    </div>

                    <div className={styles.signup}>
                        <span>Already have an account?</span>
                        <HrefLinkV2 name='Log in' url='/auth/login' />
                    </div>
                </Form>
            </div>
            <ToastNotification />
        </div >
    )
}
