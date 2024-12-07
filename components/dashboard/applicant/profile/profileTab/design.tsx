"use client"


import React, { useState } from 'react'
import ProfileTemplate from '../template'
import DesignTheme from './design/theme'
import DesignFonts from './design/font'
import SaveThemeNFont from './design/save'
import { useFormik } from 'formik'
import { AddThemeToProfile } from '@/validations/profileTheme.validation'
import { useMutation } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { AddThemeFonts } from '@/util/Mutation/profile.mutation'
import toast from 'react-hot-toast'
import ToastNotification from '@/components/notification'
import { useRouter } from 'next/navigation'


export default function ProfileDesign({ id }: { id: string }) {

    const [themes, setThemes] = useState("")
    const [fonts, setFonts] = useState("")

    const router = useRouter();


    const mutation = useMutation({
        mutationKey: ["CreatedProfileTheme"],
        mutationFn: async (inputValues: { themeId: string, fontId: string, profileId: string }) => {
            return await GraphQLRequest(AddThemeFonts, inputValues)
        },
        onSuccess: async () => {
            toast.success("Successfully Theme Added")
            await window.location.reload();
        }
    })

    const { errors, values, setFieldValue, handleSubmit, handleChange, isSubmitting, touched, setSubmitting } = useFormik({
        initialValues: {
            themeId: "",
            fontsId: "",
            profileId: id
        },
        validationSchema: AddThemeToProfile,
        onSubmit: async () => {
            await mutation.mutateAsync({
                fontId: values.fontsId,
                themeId: values.themeId,
                profileId: values.profileId
            })

            setSubmitting(false)
        }
    })

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
            <ProfileTemplate title='Themes' icon={false}>
                <DesignTheme name={'themeId'} errors={errors.themeId} touched={touched.themeId} handleChange={setFieldValue} value={values.themeId} />
            </ProfileTemplate>
            <ProfileTemplate title='Fonts' icon={false}>
                <DesignFonts name={'fontsId'} errors={errors.fontsId} touched={touched.fontsId} handleChange={setFieldValue} value={values.fontsId} />
            </ProfileTemplate>
            {values.fontsId && values.themeId ?
                <ProfileTemplate title="" icon={false}>
                    <SaveThemeNFont onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </ProfileTemplate> : null
            }
            <ToastNotification />
        </div>
    )
}
