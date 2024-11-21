"use client";

import React, { useState } from 'react'
import styles from '@/styles/auth/login.module.scss';
import { LOGIN } from '@/util/Mutation/auth.mutation';
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import store from 'store2'
//logos
import Logo from '@/app/public/beehired.png'

//icons 
import { TbEye, TbEyeOff, TbLock, TbMail } from 'react-icons/tb';

// Apollo Lib

// components
import { InputV1, InputV2 } from '@/components/input';
import { useFormik } from 'formik';
import { LoginSchema } from '@/validations/login';
import { PrimaryButton } from '@/components/button';
import { HrefLinkV2 } from '@/components/link';
import Label from '../label';
import Notice from './notice';
import Error from '../Error/error';
import Form from '@/components/form';
import { RememberMe } from '../checkbox';
import SpanError from '../Error/spanError';
import LogoContainer from '../logo';
import { toast } from 'react-hot-toast';
import ToastNotification from '../notification';

import { Login } from '@/types/auth.types';

export default function AuthLogin() {


    const router = useRouter();
    const [onToggle, setOnToggle] = useState(false)

    const remember = store.get("UserLoginAccount")

    const mutation = useMutation({
        mutationFn: async (inputValues: Login) => {
            return GraphQLRequest(LOGIN, inputValues)
        },
        onSuccess(data, variables, context) {
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const newDay = currentDay + 7;

            if (data.login.token) {
                toast.success("Successfully Login")
                store.set("UserAccount", {
                    "id": data.login.userID,
                    "role": data.login.role,
                    "user": {
                        email: data.login.user?.email,
                        myProfile: {
                            profileID: data.login.user?.myProfile?.profileID,
                            firstname: data.login.user?.myProfile?.firstname,
                            lastname: data.login.user?.myProfile?.lastname,
                        },
                        company: {
                            companyID: data.login.user?.getMyCompany?.companyID,
                        },
                        verified: data.login.user?.verified,
                    }
                })
                setCookie('access_token', data.login.token, {
                    expires: new Date(currentDate.setDate(newDay)),
                    priority: "medium",
                    path: "/",
                    sameSite: "none",
                    secure: true,
                })

                router.push("/account/onboarding")
            }
            if (data.login.code) {
                toast.error(data.login.message)
            }
        },
    })




    const { errors, handleSubmit, values, handleChange, touched, isSubmitting, resetForm } = useFormik<Login>({
        initialValues: {
            email: remember ? remember.username : "",
            password: remember ? remember.password : ""
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);

            await mutation.mutateAsync({
                email: values.email,
                password: values.password
            })

            setSubmitting(false);
        }
    })




    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    <LogoContainer />
                    <InputV1
                        icon={<TbMail size={23} />}
                        type="text" name='email' placeholder='johndoe@example.com' value={values.email} onChange={handleChange} errors={errors.email} touched={touched.email} />
                    <InputV2
                        toggle={onToggle}
                        onToggle={setOnToggle}
                        icon={<TbLock size={23} />}
                        icon2={onToggle ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                        type={onToggle ? "text" : "password"} name='password' placeholder='Password' value={values.password} onChange={handleChange}
                        errors={errors.password} touched={touched.password}
                    />

                    <div className={styles.forgotpassword}>
                        <div>
                            <RememberMe username={values.email} password={values.password} name={''} />
                            <Label name='Remember Me' required={false} />
                        </div>
                        <HrefLinkV2 name='Forgot Password?' url='/auth/forgotpassword' />
                    </div>
                    <Notice />
                    <PrimaryButton loading={isSubmitting ? true : false} name={"Login"} type='submit' />
                    <div className={styles.signup}>
                        <span>Don{"'"}t have any account yet?</span>
                        <HrefLinkV2 name='Sign Up' url='/auth/register'
                        />
                    </div>
                </Form>
            </div>
            <ToastNotification />
        </div>
    )
}
