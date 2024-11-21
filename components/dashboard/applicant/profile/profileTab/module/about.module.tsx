"use client";



import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/aboutModule.module.scss';
import { RegularPoppins } from '@/components/typograhy';
import { ButtonIconToggle, PrimaryButton } from '@/components/button';
import { TbX } from 'react-icons/tb';
import { useFormik } from 'formik';
import Label from '@/components/label';
import Textarea from '@/components/textarea';
import { useMutation } from '@tanstack/react-query';
import { AboutTypes } from '@/types/about';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { CreateValidationAbout } from '@/validations/about.validation';
import { CreateAbout } from '@/util/Mutation/about.mutation';
import toast from 'react-hot-toast';
import Form from '@/components/form';
import { queryClient } from '@/lib/provider';

export default function AboutModule({ id, value, setValue }: any) {


    const mutation = useMutation({
        mutationKey: ["CreatedAbout"],
        mutationFn: async (inputValues: AboutTypes) => {
            return await GraphQLRequest(CreateAbout, inputValues)
        },
        onSuccess(data, variables, context) {
            if (data.createAbout.aboutID) {
                toast.success("Successfully Added")
                resetForm()
                setValue(() => false)
                queryClient.invalidateQueries({
                    queryKey: ["ProfileAbout"]
                })
            }
        },
    })

    const { errors, touched, values, handleChange, isSubmitting, resetForm, handleSubmit } = useFormik({
        initialValues: {
            bio: "",
            profileId: id
        },
        validationSchema: CreateValidationAbout,
        onSubmit: async (values) => {
            await mutation.mutateAsync({
                input: {
                    bio: values.bio,
                },
                profileId: values.profileId
            })
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.aboutContainer}>
                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}></h2>
                    <ButtonIconToggle icon={<TbX size={23} />} setValue={setValue} value={value} />
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.body}>
                        <Label name="About" required={true} />
                        <Textarea errors={errors.bio} touched={touched.bio} value={values.bio} name='bio' onChange={handleChange} placeholder='Write about yourself' />
                    </div>
                    <div className={styles.footer}>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </div>
                </Form>
            </div>
        </div>
    )
}
