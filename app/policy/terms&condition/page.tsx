import React from 'react'
import styles from '@/styles/policy/terms/termsofservices.module.scss'
import { MediumPoppins, RegularPoppins } from '@/components/typograhy'
import Footer from '@/components/footer'


export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.termContainer}>

                <div className={styles.header}>
                    <h2 className={RegularPoppins.className}><b>Terms and Conditions</b></h2>
                </div>

                <div className={styles.body}>
                    <div className={styles.first}>
                        <span>Welcome to BeeHired, an online platform connecting Filipino freelancers with employers. By accessing or using the BeeHired platform, you agree to these Terms and Conditions. These terms are in accordance with the regulations set by the Department of Trade and Industry (DTI) in the Philippines.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>1. Eligibility</b></span>
                        <span>
                            To maintain a safe and professional environment, all Users must be at least 18 years old to register and use the BeeHired platform. Employers must ensure they have the legal authority to engage and hire freelancers under Philippine law. Employers must be legally authorized to hire freelancers in the Philippines, and Freelancers must comply with all applicable tax and labor laws in the Philippines.

                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>2. Account Registration</b>
                        </span>
                        <span>Users are required to provide accurate, complete, and up-to-date information during the registration process. Each user is responsible for maintaining the confidentiality of their account credentials. BeeHired reserves the right to suspend or terminate accounts that violate these T&C, applicable laws, or DTI regulations.</span>
                        <span>
                            Required Documentation
                        </span>
                        <span>For Employers</span>
                        <span>Employers are required to submit the following documents during the registration process.</span>
                        <div className={styles.second}>
                            <ul>
                                <li>Valid Business Permit: Proof of legal operation of the business</li>
                                <li>BIR permit: Bureau of Internal Revenue permit to verify tax compliance </li>
                            </ul>
                        </div>
                        <span>For Freelancers</span>
                        <span>When registering on BeeHired, freelancers are required to submit valid identification documents for verification purposes. Below is the list of primary and secondary valid IDs that freelancers can use:
                        </span>
                        <div className={styles.second}>
                            <ul className={styles.xd}>
                                <li>Passport</li>
                                <li>National ID</li>
                                <li>Driver’s License</li>
                                <li>Unified Multi-purpose ID (UMID)</li>
                                <li>Social Security System (SSS) ID</li>
                                <li>Government Service Insurance System (GSIS)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.first}>
                        <span><b>3. Job Posting by Employer</b></span>
                        <div className={styles.second}>
                            <span><b>3.1. Employers may post job openings on BeeHired, subject to the following conditions:</b></span>
                            <ul>
                                <li>
                                    <b>Accuracy and Completeness:</b> Employers must ensure that all job postings are accurate, detailed, and complete. This includes providing clear job titles, descriptions, qualifications, and any other relevant information that accurately reflects the nature of the job. Misleading or incomplete job postings are prohibited and may result in penalties, including removal of the post or suspension of the employer{"'"}s account.
                                </li>
                                <li>
                                    <b>Compliance with Applicable Laws:</b> All job postings must comply with the relevant labor laws, regulations, and standards of the Republic of the Philippines, including those established by the Department of Labor and Employment (DOLE) and the Department of Trade and Industry (DTI). This includes adherence to anti-discrimination laws and the provision of fair working conditions.
                                </li>
                                <li>
                                    <b>Prohibited Content:</b> Employers are strictly prohibited from posting job openings that involve illegal activities, discriminatory practices, or jobs that require any form of payment or fee from job seekers. Job postings that do not comply with these requirements will be immediately removed, and the employer{"'"}s account may be subject to termination or suspension.
                                </li>
                                <li>
                                    <b>Responsibility for Updates:</b>Employers are responsible for keeping their job postings up-to-date. If a job position is filled or unavailable, employers must promptly update the job posting status or archive it from the BeeHired platform. BeeHired is not liable for outdated or inaccurate information in job postings that the employer still needs to update.
                                </li>
                            </ul>
                            <span><b>3.2. Job Posting Duration:</b></span>
                            <ul>
                                <li>
                                    <b>Time Limit for Job Postings:</b> Each job posting on the BeeHired platform remains active for 21 days under the Basic Plan and 90 days under the Pro Plan, starting from the posting date. After this period, the job posting will automatically expire and be archived from the BeeHired platform. Employers will receive a notification prior to the archiving of their job posting, allowing them the opportunity to take appropriate action if needed.
                                </li>
                                <li>
                                    <b>Renewal and Extension:</b> Employers can renew or extend their job postings after the given period. To do so, employers can either create a new job posting or utilize any renewal features provided by BeeHired. Employers can choose to renew the posting if the job posting is still active and the position is still available. This will create a new job posting with the exact details and be subject to the same terms and conditions.
                                </li>
                                <li>
                                    <b>Notification of Closing:</b> BeeHired will notify employers via email or through the platform{"'"}s notification system when their job posting is nearing its closing date. A notification will include instructions on how to renew or extend the posting if the position is still available. Employers are encouraged to monitor these notifications to ensure their job openings remain active as needed.
                                </li>
                                <li>
                                    <b> Automatic Archiving:</b> If an employer does not renew or extend a job posting within the specified timeframe, the posting will automatically be archived from the BeeHired platform upon closing. If necessary, employers can retrieve and repost the job by following the platform{"'"}s standard job posting procedures.
                                </li>
                                <li>
                                    <b>No Hidden Fees:</b> BeeHired is committed to transparency and fairness. We do not charge any additional fees for the expiration, renewal, or extension of job postings, except for any standard subscription fees associated with the employer{"'"}s chosen plan (e.g., Basic or Pro Plan).
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.first}>
                        <span><b>4. Freelancer Responsibilities</b>
                        </span>
                        <span>Freelancers are expected to deliver work as per the agreed-upon terms, including quality, deadlines, and scope of work. Professional behavior is expected of freelancers, and must abstain from any actions that could harm BeeHired or other Users.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>5. Subscription</b>
                        </span>
                        <span>BeeHired offers two subscriptions plans for Employers: </span>

                        <span>
                            <b>Basic Plan</b>: This plan is free of charge and allows employers to post up to five job listings that will be featured for 21 days. Employers on this plan must comply with the same obligations as those on paid plans.

                        </span>
                        <span>
                            <b>Pro Plan</b>: This plan costs ₱399 per month and allows employers to post unlimited job listings, each of which will be featured for 90 days. Employers are responsible for ensuring that their subscription payments are up to date. Failure to pay for the Pro Plan may result in the suspension of access to the unlimited posting feature.

                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>6. Payment Terms</b>
                        </span>
                        <span>Payment arrangements, including fees, are agreed upon solely between the Employer and the Freelancer. BeeHired operates independently of these transactions, as it does not facilitate payment transactions nor provide a payment gateway. Freelancers and Employers are responsible for negotiating and agreeing on payment terms and methods.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>7. Intellectual Property</b>
                        </span>
                        <span>Freelancers retain ownership of their intellectual property unless otherwise agreed upon in writing. Employers are granted a license to use the work produced by Freelancers solely for the purposes outlined in the job posting. Both parties must respect each other’s intellectual property rights and refrain from unauthorized use.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>8. Confidentiality</b>
                        </span>
                        <span>BeeHired is dedicated to upholding the Data Privacy Act of 2012 (Republic Act No. 10173) regarding the protection of Users{"'"} personal information. Users commit to refrain from disclosing to third parties without prior authorization any confidential information they may have collected from BeeHired.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>9. Termination of Services</b>
                        </span>
                        <span>BeeHired reserves the right to terminate any account that violates these Terms & Conditions, DTI regulations, or applicable laws. Users may terminate their accounts at any time by providing notice to BeeHired. Upon termination, all pending transactions and obligations must be fulfilled.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>10. Limitation of Liability</b>
                        </span>
                        <span>BeeHired does not guarantee continuous access to the platform and is not liable for interruptions due to factors beyond its control. Users agree to indemnify BeeHired against any claims, damages, or losses arising from their use of the platform.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>11. Compliance with DTI Regulations</b>
                        </span>
                        <span>BeeHired follows the DTI{"'"}s rules for user protection, which include fair business practices, transparent transactions, and accurate information sharing. In order to stay in compliance with DTI rules and other relevant legislation, BeeHired will update these terms and conditions as needed.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>12. Governing Law</b>
                        </span>
                        <span>These Terms & Conditions are governed by and constructed in accordance with the laws of the Philippines. Any disputes arising from these Terms & Conditions will be resolved in the courts of competent jurisdiction in the Philippines.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>13. Amendments</b>
                        </span>
                        <span>BeeHired reserves the right to modify these Terms & Conditions at any time. Significant changes will be communicated to Users via email or a notice on the platform. Continued use of the platform after such changes constitutes acceptance of the new Terms & Conditions.
                        </span>
                    </div>
                    <div className={styles.first}>
                        <span><b>14. Contact Information</b>
                        </span>
                        <span>For any questions or concerns regarding these Terms & Conditions, please contact BeeHired at beehired.careers@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}
