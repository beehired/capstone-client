"use client"

import { CancelBtn, PrimaryButton } from '@/components/button'
import PromptStyles from '@/styles/components/prompt.module.scss'
import Prompt from '@/components/prompt'
import React from 'react'
import { useFormik } from 'formik'
import { UserReviewSchema } from '@/validations/review.validation'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import SpanError from '@/components/Error/spanError'
import Textarea from '@/components/textarea'
import { useMutation } from '@tanstack/react-query'
import { GraphQLRequest } from '@/lib/graphQLRequest'
import { CreateUserReview } from '@/util/Mutation/review.mutation'
import { UserReviewTypes } from '@/types/review.types'
import toast from 'react-hot-toast'
import store from 'store2'

export default function Review({ close, freelancerID }: any) {

    const user = store.get("UserAccount");

    const mutation = useMutation({
        mutationKey: ["CreateUseReview"],
        mutationFn: async (inputValues: UserReviewTypes) => {
            return await GraphQLRequest(CreateUserReview, inputValues)
        },
        onSuccess: async () => {
            toast.success("Successfully write a reivew")
            resetForm()
        }
    })

    const { errors, touched, values, handleSubmit, handleChange, isSubmitting, setFieldValue, resetForm } = useFormik({
        initialValues: {
            rating: 0,
            review: "",
            userId: freelancerID,
            companyId: user?.user.company.companyID
        },
        enableReinitialize: true,
        validationSchema: UserReviewSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await mutation.mutateAsync({
                rating: values.rating, review: values.review, userId: values.userId, companyId: values.companyId
            })
            setSubmitting(false)
        }
    })
    return (
        <Prompt title="Write a Review">
            <div className={PromptStyles.inputHeader}>
                <Rating id='rating' style={{ maxWidth: 200 }} value={values.rating} onChange={(e: any) => setFieldValue("rating", e)} itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: '#ffb700',
                    inactiveFillColor: '#fbf1a9'
                }} />
                {errors.rating && touched.rating ? <SpanError message={errors.rating} /> : null}
                <Textarea errors={errors.review} name='review' onChange={handleChange} placeholder='type your review here...' touched={touched.review} value={values.review} />
            </div>
            <div className={PromptStyles.footer}>
                {isSubmitting ? null :
                    <CancelBtn onClose={close} />}
                <form onSubmit={handleSubmit}>
                    <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                </form>
            </div>
        </Prompt>
    )
}
