"use client"

import { PrimaryButton } from '@/components/button'
import React from 'react'
import styles from '@/styles/dashboard/applicant/profile/module/save.module.scss';

export default function SaveThemeNFont({ onSubmit, isSubmitting }: any) {
    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
            </form>
        </div>
    )
}
