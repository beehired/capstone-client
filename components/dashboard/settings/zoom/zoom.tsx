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
import { RegularPoppins } from '@/components/typograhy';





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
            <div className={styles.instruction}>
                <header>
                    <h1>How to Integrate Zoom into Your Employer Account</h1>
                </header>

                <section>
                    <h2>1. Go to the Zoom Marketplace</h2>
                    <p>Open your browser and visit <a href="https://marketplace.zoom.us/" target="_blank">https://marketplace.zoom.us/</a>.</p>
                </section>

                <section>
                    <h2>2. Create a New App</h2>
                    <ul>
                        <li>In the top-right corner, click on <strong>Manage</strong>.</li>
                        <li>Hover over <strong>Develop</strong>, then click on <strong>Build App</strong>.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Select OAuth App</h2>
                    <p>Choose <strong>Server-to-Server OAuth App</strong> as the app type.</p>
                </section>

                <section>
                    <h2>4. Name Your App</h2>
                    <p>For the App Name, enter <strong>BeeHired</strong>.</p>
                </section>

                <section>
                    <h2>5. Copy App Credentials</h2>
                    <ul>
                        <li>Under <strong>App Credentials</strong>, you will see your Account ID, Client ID, and Client Secret.</li>
                        <li>Copy these details.</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Paste Credentials into BeeHired Integration Page</h2>
                    <ul>
                        <li>Log in to your employer account on the BeeHired website.</li>
                        <li>Go to the Zoom Integration page under <strong>Account Settings</strong>.</li>
                        <li>Paste the Account ID, Client ID, and Client Secret into the corresponding fields.</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Proceed to Features</h2>
                    <p>For the Information and Feature section, simply click <strong>Next</strong> to continue.</p>
                </section>

                <section>
                    <h2>8. Set Scopes</h2>
                    <p>In the Scopes section, add the following scopes:</p>
                    <ul>
                        <li>meeting:write:invite_links:admin</li>
                        <li>meeting:write:meeting:admin</li>
                        <li>user:read:list_users:admin</li>
                        <li>user:read:list_users:master</li>
                    </ul>
                </section>

                <section>
                    <h2>9. Activate the Integration</h2>
                    <p>Once everything is set, click on <strong>Activate</strong> to complete the integration.</p>
                </section>
            </div>
        </div>
    )
}
