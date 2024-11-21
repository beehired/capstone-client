import React, { Suspense } from 'react'
import VerificationPage from '@/components/auth/verification/page';
import styles from '@/styles/auth/verification/page.module.scss'
import { BoldPoppins, MediumPoppins } from '@/components/typograhy'
import Image from 'next/image'
import SuccessImage from '@/app/public/confirmed.png';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <Image src={SuccessImage} alt="" height={300} width={300} priority />
                <h2 className={BoldPoppins.className}>Your Account is Verified</h2>
                <span className={MediumPoppins.className}>
                    Your account has been successfully verified. You can now enjoy all the benefits and features BeeHired has to offer. If you encounter any issues or need assistance, please contact our support team.</span>

            </div>
            <Suspense>
                <VerificationPage />
            </Suspense>
        </div>
    )
}
