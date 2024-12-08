import Footer from '@/components/footer'
import React from 'react'
import styles from '@/styles/policy/policy.module.scss'
import { MediumPoppins } from '@/components/typograhy'
import { Metadata } from 'next'



export const metadata: Metadata = {
    title: "BeeHired: Data Policy",
    creator: "UST-CICS Group 7 BeeHired",
    authors: [
        { name: "Joshua Rembulat" },
        { name: "Gabrielle Joanna Marie Belgar" },
        { name: "Charlene Arlante" },
        { name: "Louis Ivan Virgo" },
    ],
    keywords: ["next js", "vercel", "heroku", "beehired", "hired", "freelance", "filipino", "filipino freelance"],
    openGraph: {
        type: "website",
        countryName: "Philippines",
        alternateLocale: "PH"
    }
}


export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={MediumPoppins.className}>DATA POLICY</h2>
            </div>
            <div className={styles.body}>
                <div className={styles.first}>
                    <span>
                        We at BeeHired respect your right to privacy and are committed to safeguarding any personal data you provide to us. This privacy policy describes how we obtain, utilize, and protect your data in accordance with current data protection laws. By using our platform, you consent to the practices described in this policy.
                    </span>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}><b>1. Data We Collect</b>
                    </span>
                    <div className={styles.second}>
                        <span><b>1.1 Account Registration</b></span>
                        <span>
                            We collect personal information you must provide when registering on our platform, whether as a freelancer or employer. You may be required to provide your complete name, email address, and password while registering an account. If you register as an employer, you can choose between a basic plan or a pro plan; you must provide payment and billing information for a pro plan
                        </span>
                        <span><b>1.2 Profile Creation for Freelancer</b></span>
                        <span>
                            When freelancers apply for jobs on BeeHired, we collect specific job application data. This includes files you upload, like resumes. This data is critical for employers to review your qualifications and make hiring decisions. We store this information to track your application status and ensure effective communication between you and potential employers.
                        </span>
                        <span><b>1.3 Employer Data</b>
                        </span>
                        <span>
                            We collect personal and company information when you post job listings or register for our services. Employers who post job opportunities on BeeHired are required to provide specific company information. This includes the company name, job titles, job descriptions, and the requirements for each job posting. Employers also provide additional information like application deadlines. This data helps freelancers evaluate job opportunities and facilitates communication between freelancers and employers during recruitment.
                        </span>
                        <span><b>1.4 Job Application Data</b></span>
                        <span>
                            When freelancers apply for jobs on BeeHired, we collect specific job application data. This includes files you upload, like resumes. This data is critical for employers to review your qualifications and make hiring decisions. We store this information to track your application status and ensure effective communication between you and potential employers
                        </span>
                        <span><b>1.5 Messaging Data</b>
                        </span>
                        <span>
                            BeeHired allows freelancers and employers to communicate directly through our platform. We collect the content of the messages exchanged between users, including any images shared. Additionally, we log message timestamps and the interaction history between users. This data is essential for tracking communication between freelancers and employers, enabling smooth coordination for job opportunities, interview scheduling, and contract negotiations.

                        </span>
                        <span><b>1.6 Third-Party System</b>
                        </span>
                        <span>
                            We collect personal data about you when you engage with the services of our platform, which connects employers and freelancers. This data, including job application information from third-party systems like application tracking systems (ATS), helps streamline the recruitment process, ensuring smooth communication and a more personalized experience for employers and freelancers.
                        </span>
                        <span><b>1.7 Device and Usage Data</b>
                        </span>
                        <span>
                            We collect information about the devices you use to access BeeHired and how you interact with our platform. This includes data such as device IDs, IP addresses, operating systems, browser types, and other technical details, which are essential for recognizing your device and ensuring compatibility with various systems. Additionally, we track your activity on the platform, including the pages you view, the links you click, and the time you spend on different features.
                        </span>
                        <span><b>1.8 Payment Information</b>
                        </span>
                        <span>
                            We collect payment and financial information to process the subscription for employers who subscribe to a pro plan. This includes details on payment methods such as credit card or bank account information and transaction details related to subscription fees. We store this information securely to manage subscription payments and ensure compliance with financial regulations. Your payment information is used exclusively for processing transactions related to your subscription plan and is protected according to our privacy and security standards.
                        </span>
                        <span><b>1.9 Cookies and Tracking Technologies</b>
                        </span>
                        <span>
                            Our website uses cookies and other tracking technologies to collect browsing data and improve user experience. These tools help us recognize you and your device while you use our services. You have complete control over your cookie preferences and can adjust them anytime through your browser settings.

                        </span>
                    </div>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}><b>2. How We Use Your Data</b>
                    </span>
                    <div className={styles.second}>
                        <span><b>2.1 Providing Services</b>
                        </span>
                        <span>
                            We use the personal data collected to deliver and manage the core functionalities of our platform. This includes creating and managing user accounts, facilitating job postings and applications, and matching freelancers with employers. Additionally, we enable messaging and communication between users, allowing freelancers and employers to interact directly regarding job opportunities, interviews, and other work-related matters. These functions are essential for the effective operation of BeeHired and to ensure a seamless experi
                        </span>
                        <span><b>2.2 Personalization</b>
                        </span>
                        <span>
                            We use your data to personalize the platform’s content and features for a better user experience. For freelancers, job recommendations are tailored based on their skills. We help employers find suitable candidates by matching freelancer profiles with relevant job postings. Personalization also improves overall platform functionality, making it more relevant and engaging based on user preferences and behaviors.
                        </span>
                        <span><b>2.3 Security and Compliance</b>
                        </span>
                        <span>
                            Your data is critical for maintaining the security and integrity of our platform. We use the information to prevent fraudulent activities, unauthorized access, and violations of our terms of service. By verifying user identities and monitoring interactions, we ensure a safe environment for all participants on BeeHired. Additionally, we comply with legal obligations, including employment laws and tax regulations, to ensure that our operations are lawful and adhere to relevant regulatory requirements.
                        </span>
                        <span><b>2.4 Analytics and Improvements</b></span>
                        <span>
                            We analyze data to monitor platform performance, user engagement, and emerging trends. This analysis allows us to comprehend how users engage with the platform and identifies areas for improvement. We develop new features, services, and tools based on these insights to serve our users better. We also conduct surveys and gather feedback to continuously refine the user experience, ensuring that BeeHired adapts to user requirements and preferences.
                        </span>
                    </div>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}><b>3. Data Sharing</b>
                    </span>
                    <div className={styles.second}>
                        <span><b>3.1 With Employers</b>
                        </span>
                        <span>
                            Freelancer profiles and applications are shared with employers when you apply for jobs or when they search for applicants. Freelancers profile information, application details, and messaging data may be shared to facilitate the hiring process.
                        </span>
                        <span><b>3.2 With Freelancers</b>
                        </span>
                        <span>
                            Employers who post job openings provide freelancers access to the job application details and the employer{"'"}s company details. This includes job descriptions, requirements, and company profiles, which help freelancers evaluate job opportunities and decide whether to apply.
                        </span>
                        <span><b>3.3 Service Providers</b>
                        </span>
                        <span>
                            We work with reliable third-party service providers to ensure our platform runs smoothly. This includes hosting companies who look after the technical side of the platform, payment processors that handle safe transactions, and partners in marketing and analytics who assist us in better understanding user behavior and improving our services. All these service providers must comply with our privacy standards and protect your data.
                        </span>
                        <span><b>3.4 Legal and Regulatory</b></span>
                        <span>
                            We may need to provide government or regulatory agencies access to your data. This could take place to uphold legal rights, safeguard our platform and users, or comply with legal requirements. We guarantee that any such disclosures are made in accordance with the laws and regulations and only when necessary to fulfill legal requirements or safeguard our interests and those of our users.

                        </span>
                    </div>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}>4. Your Rights
                    </span>
                    <div className={styles.second}>
                        <span><b>4.1 Data Retention</b>
                        </span>
                        <span>
                            We retain most of your data as long as your account is active to ensure seamless access to our services, including your profile, job applications, and interactions with employers or freelancers. If you choose to close your account, we will delete your data, except for anonymized or aggregated information that may be retained for operational purposes.
                        </span>
                        <span><b>4.2 Account Closure</b>
                        </span>
                        <span>
                            If you wish to close your account, you may do so at any time by contacting us at beehired.careers@gmail.com or through your account settings. Upon account closure, your personal information will be deleted or anonymized, except where we must retain certain data for legal and regulatory purposes.
                        </span>
                    </div>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}><b>5. Data Security</b>
                    </span>
                    <span>We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. This includes using encryption, secure servers, and access controls.
                    </span>
                </div>
                <div className={styles.first}>
                    <span className={styles.title}><b>6. Other Important Information</b>
                    </span>
                    <div className={styles.second}>
                        <span><b>6.1 Changes to this Policy</b>
                        </span>
                        <span>
                            This Data Policy may be updated from time to time. Any modification and the revised implementation date will be posted on our website. To keep up to date on how we safeguard your data, we advise you to read our policy from time to time.
                        </span>
                        <span><b>6.2 Contact Us</b>
                        </span>
                        <span>
                            if you have any questions or concerns about this Data Policy or how we handle your personal data, don{"'"}t hesitate to get in touch with us at beehired.careers@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
