"use client"


import React from 'react';
import styles from '@/styles/components/favouriteButton.module.scss';
import { TbBookmark } from 'react-icons/tb'
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { CreateFavourite, DeleteFavourite } from '@/util/Mutation/favourite.mutation';
import { useFormik } from 'formik';
import { FavouriteTypes } from '@/types/favourite';
import ToastNotification from './notification';
import store from 'store2';
import { FavouriteQuery } from '@/util/Query/favourite.query';
import { queryClient } from '@/lib/provider';

export default function FavouriteButton({ size, jobPostId }: any) {

    const user = store.get("UserAccount");


    const { data } = useQuery({
        queryKey: ["SelectedFavourite", jobPostId],
        queryFn: async () => {
            const { getMyFavouriteJobPost } = await GraphQLRequest(FavouriteQuery, {
                userId: user?.id,
                jobPostId: jobPostId
            })
            return getMyFavouriteJobPost
        },
    })

    const addFavouriteMutation = useMutation({
        mutationKey: ["BookmarkAdedd"],
        mutationFn: async (inputValues: FavouriteTypes) => {
            return await GraphQLRequest(CreateFavourite, inputValues)
        },
        onSuccess(data, variables, context) {
            if (data.createFavourite.favouriteID) {
                toast.success("Bookmark Added")
                queryClient.invalidateQueries({ queryKey: ["GetAllMyFavourites"] })
                queryClient.invalidateQueries({ queryKey: ["SelectedFavourite", jobPostId] })
            }

            if (data.createFavourite.code) {
                toast.error(data.createFavourite.message)
            }
        },
    })



    const deleteFavouriteMutation = useMutation({
        mutationKey: ["Bookmark Deleted"],
        mutationFn: async (inputValues: { favouriteId: string }) => {
            return await GraphQLRequest(DeleteFavourite, inputValues)
        },
        onSuccess: async (data) => {
            toast.success("Bookmark Removed")
            queryClient.invalidateQueries({ queryKey: ["GetAllMyFavourites"] })
            queryClient.invalidateQueries({ queryKey: ["SelectedFavourite", jobPostId] })

        }
    })



    const { handleSubmit: AddFavourite } = useFormik({
        initialValues: {},
        onSubmit: async () => {
            await addFavouriteMutation.mutateAsync({
                jobPostId,
                userId: user?.id
            })
        }

    })

    const { handleSubmit: DelFavourite } = useFormik({
        initialValues: {
            favouriteId: data?.favourite
        },
        onSubmit: async () => {
            await deleteFavouriteMutation.mutateAsync({
                favouriteId: data?.favouriteID
            })
        },
        enableReinitialize: true,
    })


    return (
        data ?
            <form onSubmit={DelFavourite}>
                <button type="submit" className={styles.active}>
                    <TbBookmark size={size} />
                </button>
                <ToastNotification />
            </form >
            :
            <form onSubmit={AddFavourite}>
                <button type="submit" className={styles.favourite}>
                    <TbBookmark size={size} />
                </button>
                <ToastNotification />
            </form>
    )
}
