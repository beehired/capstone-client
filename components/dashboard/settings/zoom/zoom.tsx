"use client"

import React from 'react'
import styles from '@/styles/dashboard/settings/zoom.module.scss';
import Label from '@/components/label';
import { InputV1 } from '@/components/input';
import { PrimaryButton } from '@/components/button';
import { useFormik } from 'formik';
import { ZoomIntegrationSchema } from '@/validations/zoom.validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import store from 'store2';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { CreateZoomIntegration, UpdateZoomIntegration } from '@/util/Mutation/zoom.mutation';
import toast from 'react-hot-toast';
import { GetMyZoomIntegration } from '@/util/Query/zoom.query';
import { queryClient } from '@/lib/provider';





export default function ZoomIntegration() {


    const user = store.get("UserAccount");


    const { data } = useQuery({
        queryKey: ["zoomkeys", user?.id],
        queryFn: async () => {
            const { getMyZoomIntegration } = await GraphQLRequest(GetMyZoomIntegration, {
                userId: user?.id
            })

            return getMyZoomIntegration
        }
    })

    const mutation = useMutation({
        mutationKey: ["ZoomIntegration"],
        mutationFn: async (inputValeus: { clientId: string, secretId: string, accountId: string, userId: string }) => {
            return await GraphQLRequest(CreateZoomIntegration, inputValeus)
        },
        onSuccess: () => {
            toast.success("Successfully Saved")
            queryClient.invalidateQueries({
                queryKey: ['zoomkeys']
            })
        }
    })


    const update = useMutation({
        mutationKey: ["ZoomIntegration"],
        mutationFn: async (inputValeus: { clientId: string, secretId: string, accountId: string, integrationId: string }) => {
            return await GraphQLRequest(UpdateZoomIntegration, inputValeus)
        },
        onSuccess: () => {
            toast.success("Successfully updated")
            queryClient.invalidateQueries({
                queryKey: ['zoomkeys']
            })
        }
    })

    const { handleSubmit, isSubmitting, errors, touched, handleChange, values } = useFormik({
        initialValues: {
            integrationId: data?.integrationID,
            clientID: data?.clientID ?? "",
            secretID: data?.secretID ?? "",
            accountID: data?.accountID ?? "",
            userId: user?.id

        },
        enableReinitialize: true,
        validationSchema: ZoomIntegrationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            if (data) {
                await update.mutateAsync({
                    accountId: values.accountID,
                    clientId: values.clientID,
                    secretId: values.secretID,
                    integrationId: data?.integrationID
                })

            } else {
                await mutation.mutateAsync({
                    accountId: values.accountID,
                    clientId: values.clientID,
                    secretId: values.secretID,
                    userId: values.userId
                })

            }
            setSubmitting(false);
        }
    })
    return (
        <div className={styles.container}>
            <Label name='Account ID' required={true} />
            <InputV1
                name='accountID'
                onChange={handleChange}
                placeholder='Zoom Account ID'
                type='text'
                value={values.accountID}
                errors={errors.accountID}
                touched={touched.accountID} />
            <Label name='Client ID' required={true} />
            <InputV1
                name='clientID'
                onChange={handleChange}
                placeholder='Zoom Client ID'
                type='text'
                value={values.clientID}
                errors={errors.clientID}
                touched={touched.clientID}
            />
            <Label name='Secret ID' required={true} />
            <InputV1
                name='secretID'
                onChange={handleChange}
                placeholder='Zoom Secret Key'
                type='text'
                value={values.secretID}
                errors={errors.secretID}
                touched={touched.secretID} />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <PrimaryButton loading={isSubmitting ? true : false} name='Save' type='submit' />
                </form>
            </div>
        </div>
    )
}
