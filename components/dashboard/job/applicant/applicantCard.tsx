"use client"

import React, { useState } from 'react'
import { RegularPoppins } from '@/components/typograhy'
import styles from '@/styles/dashboard/job/slug.module.scss';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { TbEye, TbCalendar, TbMessage } from 'react-icons/tb';
import { Formatter } from '@/util/formatter'
import Dialog from '@/components/dialog'
import ApplicantView from './applicantView'
import CalendarSchedule from '../schedule/schedule'
import Message from '../message/message'


export default function ApplicantCard({ applicationID, email, appID, createdAt, status, id, firstname, lastname, resume, score }: any) {

    const [toggleView, setToggleView] = useState(false);
    const [toggleCalendar, setToggleCalendar] = useState(false);
    const [toggleMessage, setToggeMessage] = useState(false);

    const onHandleToggleMessage = () => {
        setToggeMessage(() => !toggleMessage)
    }

    const onHandleToggleView = () => {
        setToggleView(() => !toggleView)
    }

    const onHandleToggleCalendar = () => {
        setToggleCalendar(() => !toggleCalendar)
    }

    return (
        <tr key={appID}>
            <td className={RegularPoppins.className}>
                <span className={styles.span}>{appID}</span>
            </td>
            <td className={RegularPoppins.className}>
                <span className={styles.span}>{lastname}, {firstname}</span>
            </td>
            <td className={RegularPoppins.className}>
                <span>{email}</span>
            </td>
            <td className={RegularPoppins.className}>
                <span className={styles.span} about={status}>{status}</span>
            </td>
            <td className={`${RegularPoppins.className} ${styles.status}`}>
                <CircularProgressbar value={parseInt(score)} maxValue={100} minValue={0}
                    background={true}
                    strokeWidth={10}
                    className={styles.progressbar}
                    text={`${score}%`}
                    styles={{
                        path: {
                            stroke: `${parseInt(score) > 50 ? "#ffa500" : parseInt(score) < 35 ? "#D02121" : "#22C55E"}`
                        },
                        trail: {
                            stroke: "#d6d6d6"
                        },
                        text: {
                            fill: "#000"
                        },
                        background: {
                            fill: "#fff"
                        }
                    }}
                />
            </td>
            <td className={RegularPoppins.className}>
                <span className={styles.span}>{Formatter(createdAt)}</span>
            </td>
            <td>
                <div className={styles.actiongrp}>
                    {
                        toggleView &&
                        <Dialog>
                            <ApplicantView close={onHandleToggleView} applicantId={applicationID} />
                        </Dialog>
                    }
                    {
                        toggleCalendar &&
                        <Dialog>
                            <CalendarSchedule close={onHandleToggleCalendar} id={id} applicantId={applicationID} />
                        </Dialog>
                    }
                    {
                        toggleMessage &&
                        <Dialog>
                            <Message close={onHandleToggleMessage} id={id} />
                        </Dialog>
                    }
                    <button className={styles.actionBtn} onClick={onHandleToggleView}>
                        <TbEye size={23} />
                    </button>
                    <button className={styles.actionBtn} onClick={onHandleToggleCalendar}>
                        <TbCalendar size={23} />
                    </button>
                    <button className={styles.actionBtn} onClick={onHandleToggleMessage}>
                        <TbMessage size={23} />
                    </button>
                </div>
            </td>
        </tr>
    )
}
