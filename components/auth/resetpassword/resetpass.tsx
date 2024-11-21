"use client"

import React, { useEffect, useState } from 'react'
import styles from '@/styles/auth/resetpassword/resetpassword.module.scss';
import { useParams, useRouter, useSearchParams, } from 'next/navigation'
import { ResetPasswordLink } from '@/util/Mutation/auth.mutation'
import { UpdateUserAccountPassword } from '@/util/Mutation/auth.mutation';
import { useFormik } from 'formik'
import { ResetPasswordSchema } from '@/validations/forgotpass'

//components
import { InputV2 } from '@/components/input'
import Form from '@/components/form'
import { PrimaryButton } from '@/components/button'
import Label from '@/components/label'
import ToastNotification from '@/components/notification';

//icon
import { TbEye, TbEyeOff, TbLock, } from 'react-icons/tb'
import Error from '@/components/Error/error';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { ResetPasswordLinkTypes, UpdatePasswordTypes } from '@/types/auth.types';

export default function ResetPass() {

    const router = useRouter();
    const search = useSearchParams()
    const params = useParams()

    const [onToggle, setToggle] = useState(false)


    //check if the generated code is not expired    
    // const [checkMutate] = useMutation(ResetPasswordLink)

    const checkMutation = useMutation({
        mutationKey: ["EmailAddress"],
        mutationFn: async (inputValues: ResetPasswordLinkTypes) => {
            return GraphQLRequest(ResetPasswordLink, inputValues)
        },
        onSuccess: (data: any) => {
            if (data.getMyResetPasswordLink.code) {
                router.push("/auth/forgotpassword/resetpassword/error");
            }
        }
    })

    useEffect(() => {
        checkMutation.mutate({
            reset: params.code
        })
    })


    // const [mutate] = useMutation(UpdateUserAccountPassword)

    const mutation = useMutation({
        mutationKey: ["ResetPassword"],
        mutationFn: async (inputValues: UpdatePasswordTypes) => {
            return GraphQLRequest(UpdateUserAccountPassword, inputValues)
        },
        onSuccess(data: any) {
            if (data.updateUserPasswordAccount.userID) {
                toast.success("Successfully Password Updated")
                resetForm()
                router.push("/auth/login")
            }
            if (data.updateUserPasswordAccount.code) {
                toast.error(data.updateUserPasswordAccount.message)
            }
        },
    })

    const { errors, touched, values, handleChange, handleSubmit, isSubmitting, resetForm } = useFormik({
        initialValues: {
            newpass: "",
            retypepass: ""
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(false)
            await mutation.mutateAsync({
                userId: search.get("userid"),
                password: values.newpass,
            })
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.si}>
                        <h2>Create New Password</h2>
                        <span>Your new password must be different from previous used password. </span>
                    </div>
                    <Label name='New Password' required={true} />
                    <InputV2 icon={<TbLock size={23} />}
                        name='newpass'
                        placeholder='New Password'
                        icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                        type={onToggle ? "text" : "password"}
                        value={values.newpass}
                        onChange={handleChange}
                        toggle={onToggle}
                        onToggle={setToggle}
                        errors={errors.newpass}
                        touched={touched.newpass}
                    />
                    <Label name='Confirm Password' required={true} />
                    <InputV2
                        icon={<TbLock size={23} />}
                        name='retypepass'
                        placeholder='Confirm Password'
                        icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                        type={onToggle ? "text" : "password"}
                        value={values.retypepass}
                        onChange={handleChange}
                        toggle={onToggle}
                        onToggle={setToggle}
                        errors={errors.retypepass}
                        touched={touched.retypepass}
                    />
                    <PrimaryButton name='Submit' type='submit' loading={isSubmitting ? true : false} />
                </Form>
            </div>
            <ToastNotification />
        </div>
    )
}
