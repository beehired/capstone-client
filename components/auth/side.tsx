"use client"
import React, { useState } from 'react'
import styles from '@/styles/auth/side.module.scss'
import { BoldPoppins } from '../typograhy';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import Link from 'next/link'

const quote = [
    { name: "Discover, connect, and thrive with BeeHired", count: 1 },
    { name: "Join BeeHired and let your career take flight.", count: 2 },
    { name: "Bridging the gap between talent and opportunity, one connection at a time.", count: 3 },
    { name: "Find your next big opportunity with BeeHired, where talent meets demand.", count: 4 }
]

export default function Side() {

    const [step, setStep] = useState(1);

    return (
        <div className={styles.container}>
            <div></div>
            <div>
            </div>
            <div className={styles.end}>
                <div className={styles.aa}>
                    <div>
                        {quote.map(({ name, count }) => (
                            step === count ?
                                <div className={styles.quote} key={count}>
                                    <span className={BoldPoppins.className}>“{name}</span>
                                </div> : null
                        ))
                        }
                    </div>
                    <div className={styles.grpbtn}>
                        <button onClick={
                            () => {
                                setStep(() => step - 1)
                                if (step <= 1) {
                                    setStep(() => 4)
                                }

                            }
                        }>
                            <TbChevronLeft size={30} />
                        </button>
                        <button onClick={() => {
                            setStep(() => step + 1)
                            if (step >= 4) {
                                setStep(() => 1)
                            }
                        }}>
                            <TbChevronRight size={30} />
                        </button>
                    </div>
                </div>
                <div className={styles.policy}>
                    <Link href="/policy/terms&condition">Terms and Condition</Link>
                    <Link href="/">Data Policy</Link>
                </div>
            </div>
        </div >
    )
}
