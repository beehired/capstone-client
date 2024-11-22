"use client"

import { InputCalendar, InputV1 } from '@/components/input'
import Label from '@/components/label'
import React from 'react'
import styles from '@/styles/dashboard/applicant/settings/profile.module.scss';
import { PrimaryButton } from '@/components/button'
import { useFormik } from 'formik'
import store from 'store2'
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetMyUserProfile } from '@/util/Query/user.query';
import { UpdateUserProfile } from '@/util/Mutation/user.mutation';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { UserProfileValidation } from '@/validations/profile.validation';
import ToastNotification from '@/components/notification';


export default function ProfilePage() {


    const user = store.get("UserAccount");

    const { data } = useQuery({
        queryKey: ["UserProfile", user?.id],
        queryFn: async () => {
            const { getProfileByUser } = await GraphQLRequest(GetMyUserProfile, {
                userId: user?.id
            })

            return getProfileByUser
        }
    })


    const mutation = useMutation({
        mutationKey: ["UpdateUserProfile"],
        mutationFn: async (inputValues: {
            userId: string,
            input: {
                firstname: string
                lastname: string
                phone: string
            }
        }) => {
            return await GraphQLRequest(UpdateUserProfile, inputValues)
        },
        onSuccess: () => {
            toast.success("Successfully Saved")
        }
    })

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting } = useFormik({
        initialValues: {
            firstname: data?.firstname,
            lastname: data?.lastname,
            phone: data?.phone,
            birthday: data?.birthday
        },
        validationSchema: UserProfileValidation,
        enableReinitialize: true,
        onSubmit: async () => {
            await mutation.mutateAsync({
                userId: user?.id,
                input: {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    phone: values.phone
                }
            })
        }
    })
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <Label name='First Name' required={true} />
                    <InputV1 name={'firstname'} placeholder={''} type={'tel'} value={values.firstname} onChange={handleChange} errors={errors.firstname} touched={touched.firstname} />
                </div>
                <div>
                    <Label name='Last Name' required={true} />
                    <InputV1 name={'lastname'} placeholder={''} type={'tel'} value={values.lastname} onChange={handleChange} errors={errors.firstname} touched={touched.lastname} />
                </div>
            </div>
            <div>
                <h2>Phone Number</h2>
                <InputV1 name={'phone'} placeholder={''} type={'tel'} value={values.phone} onChange={handleChange}
                    errors={errors.phone} touched={touched.phone}
                />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <PrimaryButton loading={isSubmitting ? true : false} name='Save' type='submit' />
                </form>
            </div>
            <ToastNotification />
        </div>
    )
}
