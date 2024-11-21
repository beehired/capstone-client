"use client"
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/social.module.scss';
import NotAvailable from '@/components/notavailable';
import { TbBrandFacebook, TbBrandFacebookFilled, TbBrandGithub, TbBrandInstagram, TbBrandX, TbGlobe, TbWorldWww } from 'react-icons/tb';
import { InputV1 } from '@/components/input';
import { useFormik } from 'formik';
import Label from '@/components/label';
import { RegularPoppins } from '@/components/typograhy';
import { PrimaryButton } from '@/components/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { SocialLinkQuery } from '@/util/Query/social.query';
import { isEmpty } from 'lodash';
import { CreateSocialLink, UpdateSocialLink } from '@/util/Mutation/social.mutation';
import { social, UpdateSocial } from '@/types/social';
import toast from 'react-hot-toast';
import ToastNotification from '@/components/notification';
import { queryClient } from '@/lib/provider';

export default function SocialLinks({ id }: { id: string }) {



    const { data } = useQuery({
        queryKey: ["MySocialLinks", id],
        queryFn: async () => {
            const { getAllMySocialLink } = await GraphQLRequest(SocialLinkQuery, {
                profileId: id
            })

            return getAllMySocialLink
        }
    })


    const CreateMutation = useMutation({
        mutationKey: ["CreateSocialLink"],
        mutationFn: async (inputValues: social) => {
            return await GraphQLRequest(CreateSocialLink, inputValues)
        },
        onSuccess: async () => {
            toast.success("Added Social Media links")
        }
    })


    const UpdateMutation = useMutation({
        mutationKey: ["UpdateSocialLink"],
        mutationFn: async (inputValues: UpdateSocial) => {
            return await GraphQLRequest(UpdateSocialLink, inputValues)
        },
        onSuccess: async () => {
            toast.success("Updated Social Media Link")
            queryClient.invalidateQueries({
                queryKey: ["MySocialLinks"]
            })
        }
    })

    console.log(data)

    const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            facebook: data?.facebook ?? "",
            instagram: data?.instagram ?? "",
            x: data?.X ?? "",
            github: data?.Github ?? "",
            Web: data?.Web ?? ""
        },
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {

            if (isEmpty(data)) {
                await CreateMutation.mutateAsync({
                    profileId: id,
                    instagram: values.instagram,
                    facebook: values.facebook,
                    github: values.github,
                    x: values.x,
                    web: values.Web
                })

                setSubmitting(false)

            } else {
                await UpdateMutation.mutateAsync({
                    socialId: data?.socialID,
                    facebook: values.facebook,
                    github: values.github,
                    instagram: values.instagram,
                    web: values.Web,
                    x: values.x
                })
                setSubmitting(false)
            }
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.socialContainer}>
                <div className={styles.brand}>
                    <TbBrandFacebook size={25} />
                    <Label name="Facebook" required={false} />
                </div>
                <InputV1 name='facebook' onChange={handleChange} type='text' placeholder='Facebook url' value={values.facebook} />
            </div>
            <div className={styles.socialContainer}>
                <div className={styles.brand}>
                    <TbBrandInstagram size={25} />
                    <Label name="Instagram" required={false} />
                </div>
                <InputV1 name='instagram' onChange={handleChange} placeholder='Instagram URL' type='text' value={values.instagram} />
            </div>
            <div className={styles.socialContainer}>
                <div className={styles.brand}>
                    <TbBrandX size={25} />
                    <Label name="Twitter / X" required={false} />
                </div>
                <InputV1 name='x' onChange={handleChange} placeholder='X URL' type='text' value={values.x} />
            </div>

            <div className={styles.socialContainer}>
                <div className={styles.brand}>
                    <TbBrandGithub size={25} />
                    <Label name="Github" required={false} />
                </div>
                <InputV1 name='github' onChange={handleChange} placeholder='Github URL' type='text' value={values.github} />
            </div>

            <div className={styles.socialContainer}>
                <div className={styles.brand}>
                    <TbWorldWww size={25} />
                    <Label name="Portfolio Link" required={false} />
                </div>
                <InputV1 name='Web' onChange={handleChange} placeholder='Website URL' type='text' value={values.Web} />
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <PrimaryButton loading={isSubmitting ? true : false} name='Save' type='submit' />
                </form>
            </div>
            <ToastNotification />
        </div>
    )
}
