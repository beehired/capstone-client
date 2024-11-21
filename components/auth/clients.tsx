"use client"

import styles from '@/styles/auth/client.module.scss'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { ClientRegister } from '@/validations/registerSchema';
import { MediumPoppins, RegularPoppins } from '../typograhy';
import Country from '@/util/country.json'
import { useRouter } from 'next/navigation';
//icons
import { TbCheck, TbChevronLeft, TbChevronRight, TbEye, TbEyeOff, TbStack2Filled, TbStackFilled, TbTrash } from 'react-icons/tb';

//lib 
import { CheckEmailAddress } from '@/util/Mutation/auth.mutation';
import { CreateUserRecruiter } from '@/util/Mutation/user.mutation';
import { useMutation } from '@apollo/client';

//components
import SpanError from '../Error/spanError';
import Label from '../label';
import Form from '../form';
import { CheckboxV1 } from '../checkbox';
import { ButtonStepState, PrimaryButton } from '../button';
import { InputV1, InputV2 } from '../input';
import { HrefLinkV2 } from '../link';
import Textarea from '../textarea';
import SelectForm from '../select';
import FileUploads from '../fileupload';
import Dialog from '../dialog';
import TermsAndCondition from '../Policies/termsandagree';
import { toast } from 'react-hot-toast';
import ToastNotification from '../notification';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const plans = [
    {
        name: "Basic Plan", value: "BASIC", price: 0, features: [
            {
                post: "21-Day Job Posting",
                f1: "1-Day Job Posting Creation Per Post",
                f2: "Application Tracking System",
                f3: "Schedule Management",
                f4: "Project Organizer",
            }
        ], description: "", icon: <TbStackFilled size={40} />
    },
    {
        name: "Pro Plan", price: 2999, value: "PRO", features: [
            {
                post: "Unlimited Job Posting",
                f1: "90-Day Job Posting",
                f2: "Application Tracking System",
                f3: "Schedule Management",
                f4: "Project Organizer",
            }
        ], icon: <TbStack2Filled size={40} />
    },
]

export default function Clients() {


    const router = useRouter();

    const [step, setStep] = useState(1);
    const [toggle, setToggle] = useState(false)
    const [fileUpload, setFileUpload] = useState<any>()


    // const [mutate] = useMutation(CreateUserRecruiter)
    const csize = [
        { name: "Small (1-50 employees)", value: "1-50 employees" },
        { name: "Medium (51-250 employees)", value: "51-250 employees" },
        { name: "Large (251-1000 employees)", value: "251-1000 employees" },
        { name: "Enterprise (1000+ employees)", value: "1000+ employees" },
    ]


    const [mutate] = useMutation(CreateUserRecruiter)

    const { errors, values, handleChange, handleSubmit, touched, setFieldValue, resetForm, isSubmitting, validateForm, setSubmitting } = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPass: "",
            plan: "",
            firstname: "",
            lastname: "",
            companyName: "",
            country: "",
            description: "",
            location: "",
            companySize: "",
            upload: "",
            subscriptionId: "",
            tnc: false
        },
        validationSchema: ClientRegister,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            await mutate({
                variables: {
                    input: {
                        firstname: values.firstname,
                        lastname: values.lastname,
                        email: values.email,
                        password: values.password,
                        plan: values.plan,
                        companyName: values.companyName,
                        companySize: values.companySize,
                        description: values.description,
                        location: `${values.country}, ${values.location}`,
                    },
                    file: fileUpload,
                    subscriptionId: values.subscriptionId
                },
                onCompleted(data) {
                    if (data.createUserRecruiter.userID) {
                        toast.success("Successfully Created")

                        if (values.plan === "BASIC") {
                            router.push("/auth/login")
                        }
                    }
                    if (data.createUserRecruiter.code) {
                        toast.error(data.createUserRecruiter.message)
                    }
                },
            })

            setSubmitting(false);
        }
    })


    const [EmailMutation, { data: EmailData }] = useMutation(CheckEmailAddress, {
        variables: {
            email: values.email
        },
        onCompleted: (data) => {
            if (data.checkMyEmailAddress.code) {
                toast.error(data.checkMyEmailAddress.message)
            }
        }
    })


    const onHandleChangeTNC = () => {
        setFieldValue("tnc", true)
    }

    const onHandleCompanySize = (e: any) => {
        setFieldValue("companySize", e.target.value)
    }

    const onHandleCountry = (e: any) => {
        setFieldValue("country", e.target.value)
    }

    const onHandleIncrementStep = async () => {

        const formErrors = await validateForm();

        if (step === 1 && formErrors.plan) {
            setStep(1)
            toast.error("Oops! Some fields are incomplete. Please fill in all required fields.");
        } else if (step === 2 && formErrors.firstname && formErrors.firstname && formErrors.email && formErrors.password && formErrors.confirmPass) {
            setStep(2)
            toast.error("Oops! Some fields are incomplete. Please fill in all required fields.");
        } else if (step === 3 && formErrors.upload && formErrors.companyName) {
            setStep(3)
            toast.error("Oops! Some fields are incomplete. Please fill in all required fields.");
        } else if (step === 4 && formErrors.tnc && formErrors.description && formErrors.location && formErrors.tnc) {
            setStep(4)
            toast.error("Oops! Some fields are incomplete. Please fill in all required fields.");

        }
        else {
            setStep(() => step + 1)
        }

    }

    const oHandleDecrementStep = () => {
        setStep(() => step - 1)
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
                    {/* <LogoContainer /> */}
                    <div className={styles.si}>
                        <h2>Create an Account</h2>
                        <span>Welcome to BeeHired, your go-to platform for finding top talent. Creating a recruiter account with us is your gateway to discovering the best candidates for your company.</span>
                    </div>
                    {
                        step === 1 ?
                            <div className={styles.plans}>
                                <h2 className={RegularPoppins.className}>Choose your plan</h2>
                                <div className={styles.pcontainer}>
                                    <div className={styles.p}>
                                        {plans.map(({ name, icon, value, features }) => (
                                            <div className={styles.planContainer} key={name}>
                                                <div className={styles.header}>
                                                    <div className={styles.planHeader}>
                                                        {icon}
                                                        <span className={MediumPoppins.className}>{name}</span>
                                                    </div>
                                                    <input type="radio" name='plan' id='plan' value={value} onChange={handleChange} />
                                                </div>
                                                <div className={styles.body}>
                                                    {features.map(({ f1, post, f2, f3 }: any) => (
                                                        <div className={styles.features} key={post}>
                                                            <span><TbCheck size={23} />{post}</span>
                                                            <span><TbCheck size={23} /> {f1}</span>
                                                            {f2 ? <span><TbCheck size={23} /> {f2}</span> : null}
                                                            {f3 ? <span><TbCheck size={23} /> {f3}</span> : null}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.plan && touched.plan ? <SpanError message={errors.plan} /> : null}
                                </div>

                            </div> :
                            null
                    }
                    {step === 2 && <div className={styles.step1}>
                        <div className={styles.personal}>
                            <div className={styles.om}>
                                <Label name="Firstname" required={true} />
                                <InputV1 placeholder='Firstname' name='firstname' onChange={handleChange} value={values.firstname} type='text' errors={errors.firstname} touched={touched.firstname} />
                            </div>
                            <div className={styles.om}>
                                <Label name="Lastname" required={true} />
                                <InputV1 placeholder='Lastname' name='lastname' onChange={handleChange} value={values.lastname} type='text' errors={errors.lastname} touched={touched.lastname} />
                            </div>
                        </div>

                        <div className={styles.om}>
                            <Label name="Email Address" required={true} />
                            <InputV1 placeholder='Email Address' name='email' onChange={handleChange} value={values.email} type='text' errors={errors.email} touched={touched.email} />

                            <div className={styles.om}>
                                <Label name="Password" required={true} />
                                <InputV2
                                    icon2={toggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                                    toggle={toggle}
                                    onToggle={setToggle}
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleChange}
                                    value={values.password}
                                    type={toggle ? "text" : "password"}
                                    errors={errors.password}
                                    touched={errors.password}
                                />
                            </div>

                            <div className={styles.om}>
                                <Label name="Confirm Password" required={true} />
                                <InputV2
                                    icon2={toggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                                    toggle={toggle}
                                    onToggle={setToggle}
                                    placeholder='Confirm Password'
                                    name='confirmPass'
                                    onChange={handleChange}
                                    value={values.confirmPass}
                                    type={toggle ? "text" : "password"}
                                    errors={errors.confirmPass}
                                    touched={touched.confirmPass}
                                />
                            </div>
                        </div>
                    </div>
                    }


                    {
                        step === 3 && <div className={styles.step2}>
                            <div className={styles.fileUpload}>
                                <div>
                                    <FileUploads setFieldValue={setFieldValue} value={values.upload} selectedFile={setFileUpload} dragisActive={'Drop your Company Logo'}
                                        isNotActive={'Drop your Company Logo'} requiredWidth={500} requiredHeight={500} componentName={'company'} />
                                    <div>
                                        {errors.upload && touched.upload ? <SpanError message={errors.upload} /> : null}
                                    </div>
                                </div>
                            </div>
                            <Label name="Company Name" required={true} />
                            <InputV1 name='companyName' type='text' placeholder='Company Name' value={values.companyName} onChange={handleChange} errors={errors.companyName} touched={touched.companyName} />

                        </div>
                    }

                    {
                        step === 4 &&
                        <div className={styles.step2}>
                            <Label name="Description" required={true} />
                            <Textarea name='description' placeholder='Company Description' value={values.description} onChange={handleChange} errors={errors.description} touched={touched.description} />
                            <div className={styles.companyAddress}>
                                <div className={styles.country}>
                                    <Label name='Country' required={true} />
                                    <SelectForm onClick={onHandleCountry} title="Country" size={Country.countries} value={values.country} errors={errors.country} touched={touched.country} />
                                </div>
                                <div className={styles.location}>
                                    <Label name='Company Address' required={true} />
                                    <InputV1 name='location' placeholder='' type='text' onChange={handleChange} value={values.location} errors={errors.location} touched={touched.location} />

                                </div>

                            </div>

                            <Label name='Company Size' required={true} />
                            <SelectForm onClick={onHandleCompanySize} title="Company Size" size={csize} value={values.companySize} errors={errors.companySize} touched={touched.companySize} />
                            <div className={styles.agreement}>
                                <CheckboxV1 name='tnc' checked={values.tnc} onChange={handleChange} />
                                <span>I agree to this <HrefLinkV2 name='Terms and Agreement' url='/policy/terms&condition' /> and   <HrefLinkV2 name='Data Policy' url='/policy/datapolicy' />.</span>
                            </div>
                            {errors.tnc && touched.tnc ? <SpanError message={errors.tnc} /> : null}
                        </div>
                    }
                    {
                        step === 5 && values.plan === "PRO" ?
                            <div>
                                <PayPalScriptProvider options={{
                                    clientId: "AXx3sBHkOLGsXGwDGUWHBuTamx3UXpGibk4lEMIGmK_qKfqtELMUK1AFFAN1uUuhNV3EkvqymcF44Ttp",
                                    vault: true,
                                    intent: "subscription",
                                    dataSdkIntegrationSource: "button-factory",
                                }}>
                                    <PayPalButtons
                                        style={{
                                            shape: 'rect',
                                            color: 'blue',
                                            layout: 'vertical',
                                            label: 'subscribe'
                                        }}
                                        onCancel={() => {
                                            setSubmitting(false)
                                            toast.error("Payment was canceled. Form submission has been halted.");
                                        }}
                                        onApprove={(data): any => {

                                            console.log(data)

                                            console.log(data.subscriptionID)
                                            setFieldValue("subscriptionId", data.subscriptionID)

                                            setTimeout(() => {
                                                handleSubmit();
                                                router.push("/auth/login");
                                            }, 3000);

                                        }
                                        }
                                        createSubscription={async (data, actions) => {
                                            console.log(data)
                                            return actions.subscription.create({
                                                plan_id: 'P-3XS60270TK051852HM4FCEIY'
                                            })

                                        }
                                        }
                                    ></PayPalButtons>
                                </PayPalScriptProvider>
                            </div> : null
                    }
                    <div className={styles.btnStepContainer}>
                        <ButtonStepState
                            disabled={step <= 1}
                            name='Previous'
                            onHandleClick={oHandleDecrementStep}
                            icon={<TbChevronLeft size={20} />}
                        />
                        {

                            step === 4 && values.plan === "BASIC" ? null : values.plan === "PRO" && step === 5 ? null :
                                <ButtonStepState
                                    disabled={step > 4}
                                    name='Next'
                                    onHandleClick={async () => {

                                        if (step === 4) {
                                            EmailMutation()
                                        } else {
                                            onHandleIncrementStep()
                                        }

                                        if (EmailData?.checkMyEmailAddress.code) {
                                            return
                                        } else {
                                            onHandleIncrementStep()
                                        }



                                    }}
                                    icon2={<TbChevronRight size={20} />} />
                        }

                        {values.plan === "BASIC" && step === 4 ?
                            <PrimaryButton
                                loading={isSubmitting ? true : false}
                                name='Submit' type='submit' />
                            : null
                        }
                    </div>

                    <div className={styles.signup}>
                        <span>Already have an account?</span>
                        <HrefLinkV2 name='Log in' url='/auth/login' />
                    </div>
                </Form >

            </div >
            <ToastNotification />
        </div >
    )
}
