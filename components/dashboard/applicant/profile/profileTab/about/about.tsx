"use client"

import { ButtonIconToggle, CancelBtn, PrimaryButton } from '@/components/button'
import ToastNotification from '@/components/notification'
import Spinner from '@/components/spinner'
import { RegularPoppins } from '@/components/typograhy'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { GetMyAboutByProfileID } from '@/util/Query/about.query'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { TbAlertCircleFilled, TbEdit, TbTrash } from 'react-icons/tb'
import styles from '@/styles/dashboard/applicant/profile/about.module.scss'
import Dialog from '@/components/dialog'
import PromptStyles from '@/styles/components/prompt.module.scss';
import AboutEdit from '../module/aboutEdit.module'
import Prompt from '@/components/prompt'
import { useFormik } from 'formik'
import { DeleteAbout } from '@/util/Mutation/about.mutation'
import toast from 'react-hot-toast'
import { queryClient } from '@/lib/provider'
import { isEmpty } from 'lodash'
import NotAvailable from '@/components/notavailable'

export default function About({ id }: { id: string }) {


    const [editToggle, setEditToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["ProfileAbout"],
        queryFn: async () => {
            const { getAboutByProfileID } = await GraphQLRequest(GetMyAboutByProfileID, {
                profileId: id
            })

            return getAboutByProfileID
        }
    })


    const mutation = useMutation({
        mutationKey: ["AboutDelete"],
        mutationFn: async (inputValues: { aboutId: string }) => {
            return await GraphQLRequest(DeleteAbout, inputValues)
        },
        onSuccess: (data) => {
            if (data.deleteAbout.aboutID) {
                toast.success("Successfully deleted")
                setDeleteToggle(false)
                queryClient.invalidateQueries({
                    queryKey: ['ProfileAbout']
                })
            }
        }
    })

    const onHandleDeleteToggle = () => {
        setDeleteToggle(() => !deleteToggle)
    }

    const { handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            aboutId: data?.aboutID
        },
        // validationSchema: DeleteValidationAbout,
        onSubmit: async (values) => {
            await mutation.mutateAsync({
                aboutId: data?.aboutID
            })

        }
    })
    return (
        <div className={styles.container}>
            {
                editToggle ?
                    <Dialog>
                        <AboutEdit value={editToggle} setValue={setEditToggle} id={data?.aboutID} />
                    </Dialog> : null
            }
            {
                deleteToggle ? <Dialog>
                    <Prompt title='Do you want to delete?' icon={<TbAlertCircleFilled size={23} />}>
                        <div className={styles.header}>
                            <span>Are you sure you want to delete this about from your profile? Once removed, all related information, such as your degree, will be permanently deleted and cannot be restored. Please confirm if you{"'"}d like to proceed with this action.</span>
                        </div>
                        <div className={PromptStyles.footer}>
                            <CancelBtn onClose={onHandleDeleteToggle} />
                            <form onSubmit={handleSubmit}>
                                <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                            </form>
                        </div>
                    </Prompt>
                </Dialog> : null
            }
            {
                isLoading ? <Spinner /> : isEmpty(data) ? <NotAvailable /> :
                    <>
                        <p className={RegularPoppins.className}>{data?.bio}</p>
                        <div className={styles.btnGrp}>
                            <ButtonIconToggle icon={<TbEdit size={23} />} value={editToggle} setValue={setEditToggle} />
                            <ButtonIconToggle icon={<TbTrash size={23} />} value={deleteToggle} setValue={setDeleteToggle} />
                        </div>
                    </>
            }
            <ToastNotification />
        </div >
    )
}
