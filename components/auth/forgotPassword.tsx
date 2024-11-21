"use client"

import React, { useEffect, useState } from 'react'
import { TbChevronLeft, TbMail } from 'react-icons/tb'
import { useFormik } from 'formik'
import { ForgotPasswordSchema } from '@/validations/forgotpass'
import styles from '@/styles/auth/forgotpassword.module.scss';
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { ForgotPasswordTypes } from '@/types/auth.types'

//
import { FINDEmailAddress } from '@/util/Mutation/auth.mutation'

//components
import Form from '../form'
import Label from '../label'
import { InputV1 } from '../input'
import { PrimaryButton } from '../button'
import Error from '../Error/error'
import { RegularPoppins } from '../typograhy'
import { toast } from 'react-hot-toast'
import ToastNotification from '../notification'

export default function ForgotPassword() {

    const router = useRouter();
    // const [mutate] = useMutation(FINDEmailAddress)
    const [message, setMessage] = useState("")
    const [count, setCount] = useState(5)



    const mutation = useMutation({
        mutationKey: ["ForgotPassword"],
        mutationFn: async (inputValues: ForgotPasswordTypes) => {
            return GraphQLRequest(FINDEmailAddress, inputValues)
        },
        onSuccess: (data) => {
            toast.success("Successfully Sent!");
            if (data.findMyEmailAddress.userID) {
                toast.success("Successfuly Email Sent!")
                resetForm();
                setMessage("An email with the password reset link has been successfully sent to your registered email address. Please check your email to proceed with resetting your password.")
            }

            if (data.findMyEmailAddress.code) {
                toast.error(data.findMyEmailAddress.message)
            }
        }
    })


    useEffect(() => {

        if (message !== "") {
            const interval = setInterval(() => {
                setCount(() => count - 1);
            }, 1000)

            if (count === 0) {
                router.push("/auth/login")
            }

            return () => clearInterval(interval)
        }

    }, [count, message, router])
    const { errors, handleSubmit, touched, values, handleChange, isSubmitting, resetForm } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(false);
            await mutation.mutateAsync({
                email: values.email
            })
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form onSubmit={handleSubmit} >
                    <div className={styles.si}>
                        <h2>Reset Password</h2>
                        <span>
                            To reset your password, enter the email associated with your account.</span>
                    </div>
                    {message !== "" ? <div className={styles.message}>
                        <span className={RegularPoppins.className}> {message}</span>
                        <span className={RegularPoppins.className}>Redirecting {count}s</span>
                    </div> :
                        <>
                            <Label name="Email Address" required={true} />
                            <InputV1 icon={<TbMail size={23} />} name='email'
                                onChange={handleChange}
                                placeholder='johndoe@example.com'
                                type='text'
                                value={values.email}
                                errors={errors.email}
                                touched={errors.email}
                            />
                            <PrimaryButton loading={isSubmitting ? true : false} name={"Submit"} type='submit' />

                            <div className={styles.goback}>
                                <button type="button" onClick={() => router.push("/auth/login")}>
                                    <TbChevronLeft size={20} />
                                    <span className={RegularPoppins.className}>Go Back to Login</span>
                                </button>
                            </div>
                        </>}
                </Form >
            </div>

            <ToastNotification />
        </div>
    )
}
