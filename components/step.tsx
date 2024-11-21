import React from 'react'
import styles from '@/styles/components/step.module.scss';
import { BoldPoppins } from './typograhy';
interface Props {
    number: number
    step: number
}

export default function StepForm({ number, step }: Props) {
    return (
        <div className={step >= number ? styles.complete : styles.incomplete}>
        </div>
    )
}
