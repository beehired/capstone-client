"use client"

import React, { useState } from 'react'
import styles from '@/styles/dashboard/applicant/project/project.module.scss';
import { Formatter } from '@/util/formatter';
import { TbEye, TbNote, TbX } from 'react-icons/tb';
import Review from './review/review';
import Dialog from '@/components/dialog';
import { format } from 'date-fns';
import parse from 'html-react-parser'
import { RegularPoppins } from '@/components/typograhy';
import { ButtonIconToggle } from '@/components/button';

export default function ProjectCard({ projectOrganizerID, amount, startDate, endDate, company, title, status, description }: any) {

    const [toggleView, setToggleView] = useState(false)
    const [review, setReview] = useState(false);


    const onHandleReview = () => {
        setReview(() => !review)
    }
    const onHandleToggleView = () => {
        setToggleView(() => !toggleView)
    }

    return (
        <div className={styles.tr} key={projectOrganizerID}>

            {
                review ?
                    <Dialog>
                        <div className={styles.reviewContainer}>
                            <Review close={onHandleReview} companyID={company.companyID} />
                        </div>
                    </Dialog> : null
            }
            {
                toggleView ?
                    <Dialog>
                        <div className={styles.toggleView}>
                            <div className={styles.projectView}>
                                <div className={styles.projectHeader}>
                                    <h2 className={RegularPoppins.className}>{title}</h2>
                                    <div className={styles.grpBtn}>
                                        <button onClick={onHandleToggleView}>
                                            <TbX size={23} />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.projectBody}>
                                    <span><b>Status: </b>{status}</span>
                                    <span><b>Start Date: </b>{format(new Date(startDate), "MMMM dd, yyy")}</span>
                                    <span><b>End Date:</b> {format(new Date(endDate), "MMMM dd, yyyy")}</span>
                                    <span><b>Company Name:</b> {company.companyName}</span>
                                    <span><b>Amount: </b> {amount}</span>
                                    <div>
                                        <span><b>Description: </b> </span>
                                    </div>

                                    <div>
                                        {parse(description)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog> : null
            }
            <div className={styles.td}>{company?.companyName}</div>
            <div className={styles.td}>{title}</div>
            <div className={styles.td}>{Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP"
            }).format(amount)}</div>
            <div className={styles.td}>{Formatter(startDate)}</div>
            <div className={styles.td}>{Formatter(endDate)}</div>
            <div className={styles.td}>
                <div className={styles.actionsBtnGrp}>
                    <ButtonIconToggle icon={<TbEye size={23} />} setValue={setToggleView} value={toggleView} />
                    {status === "Completed" ?
                        <ButtonIconToggle icon={<TbNote size={23} />} setValue={setReview} value={review} /> : null}
                </div>
            </div>
        </div>
    )
}
