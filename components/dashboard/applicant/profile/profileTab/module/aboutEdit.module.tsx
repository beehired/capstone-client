"use client"
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/aboutEdit.module.scss';
import Form from '@/components/form';
import { ButtonIconToggle, PrimaryButton } from '@/components/button';
import { TbX } from 'react-icons/tb';
import Label from '@/components/label';
import { RegularPoppins } from '@/components/typograhy';
import { useFormik } from 'formik';
import Textarea from '@/components/textarea';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { UpdateAbout } from '@/util/Mutation/about.mutation';
import { GetMyAboutById } from '@/util/Query/about.query';
import toast from 'react-hot-toast';
import Spinner from '@/components/spinner';
import { UpdateValidationAbout } from '@/validations/about.validation';
import { queryClient } from '@/lib/provider';


export default function AboutEdit({ id, value, setValue }: any) {


    const { data, isLoading } = useQuery({
        queryKey: ["ProfileAbout", id],
        queryFn: async () => {
            const { getAboutById } = await GraphQLRequest(GetMyAboutById, {
                aboutId: id
            })

            return getAboutById
        },
        enabled: !!id
    })


    console.log(data)

    const mutation = useMutation({
        mutationKey: ["UpdateAbout"],
        mutationFn: async (inputValues: { aboutId: string, bio: string }): Promise<any> => {
            return await GraphQLRequest(UpdateAbout, inputValues)
        },
        onSuccess(data, variables, context) {
            if (data.updateAbout.aboutID) {
                toast.success("Successfully Updated")
                setValue(() => false)
                queryClient.invalidateQueries({
                    queryKey: ['ProfileAbout']
                })
            }
        },
    })

    const { values, errors, handleSubmit, handleChange, touched, isSubmitting } = useFormik({
        initialValues: {
            bio: data?.bio,
            aboutId: data?.aboutID
        },
        enableReinitialize: true,
        validationSchema: UpdateValidationAbout,
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({
                aboutId: values.aboutId,
                bio: values.bio
            })
            setSubmitting(false)
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.aboutContainer}>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.header}>
                        <h2 className={RegularPoppins.className}>Edit About</h2>
                        <ButtonIconToggle icon={<TbX size={23} />} setValue={setValue} value={value} />
                    </div>
                    {isLoading ? <Spinner /> :
                        <div className={styles.body}>
                            <Label name="About" required={true} />
                            <Textarea errors={errors.bio} touched={touched.bio} value={values.bio} name='bio' onChange={handleChange} placeholder='Write about yourself' />
                        </div>
                    }
                    <div className={styles.footer}>
                        <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                    </div>
                </Form>
            </div>
        </div>
    )
}
