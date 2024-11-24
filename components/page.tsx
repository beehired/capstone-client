'use client'


import React from 'react'

import Image from "next/image";
import About1 from '@/app/public/homepage/aboutus-p1.png'
import About2 from '@/app/public/homepage/aboutus-p2.png'
import About3 from '@/app/public/homepage/aboutus-p3.png'
import About4 from '@/app/public/homepage/aboutus-p4.png';
import PricingPro from '@/app/public/homepage/pricingpro.png'
import PricingBasic from '@/app/public/homepage/pricingbasic.png'
import Mission from '@/app/public/homepage/mission.jpg';
import Vision from '@/app/public/homepage/vision.jpg';
import Freelancer from '@/app/public/homepage/freelancer.png'
import Employer from '@/app/public/homepage/employer.png';
import PromptStyles from '@/styles/components/prompt.module.scss'
import { TbNotes, TbRocket, TbSearch, TbUserFilled } from "react-icons/tb";
import { useState } from "react";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";

import Mobile from "@/components/Header/mobile";
import Web from "@/components/Header/web";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Companies from "@/components/home/companies";
import Post from "@/components/home/post";
import { BoldPoppins, MediumPoppins, RegularPoppins } from "@/components/typograhy";
import styles from "@/styles/page.module.scss";
import { CancelBtn } from './button';

const validIDs = [
    { name: "National ID", value: "National ID" },
    { name: "Social Security System", value: "SSS ID" },
    { name: "Professional Regulatory Comisssion", value: "PRC ID" },
    { name: "Driver's License from Land Transportation Office", value: "Driver's License" },
    { name: "Overseas Workers Welfare Administration", value: "OWWA ID" },
    { name: "Department of Labor and Employment", value: "iDOLE ID" },
    { name: "Firearms License from Philippines National Police", value: "PNP ID" },
    { name: "Passport", value: "Passport" },
    { name: "PhilHealth ID", value: "PhilHealth Digitized PVC" }
]

const EmployerIds = [
    { name: "Business Permit", value: "Business Permit" },
    { name: "Tax Identification Number (TIN)", value: "Tax Identification Number" },
    { name: "BIR Certificate of Registration", value: "BIR Certificate of Registration" },
    { name: "SEC Registration", value: "SEC Registration" },
    { name: "DTI Registration", value: "DTI Registration" },
    { name: "Mayor's Permit", value: "Mayor Permit" },

]
const randomSkills = ["Data Analyst", "Virtual Assistant", "Product Manager", "3D Illustrator", "Video Creator", "UI/UX Designer", "Marketing", "SEO", "Email Marketing", "Graphics Design"]
export default function Homepage() {
    const [freelancer, setFreelancer] = useState(false);
    const [employer, setEmployer] = useState(false);


    const onHandleFreelancer = () => {
        setFreelancer(() => !freelancer)
    }

    const onHandleEmlpoyer = () => {
        setEmployer(() => !employer)
    }



    return (
        <div className={styles.container}>
            <Header>
                <Web />
                <Mobile />
            </Header>
            {
                freelancer ?
                    <Dialog>
                        <Prompt title="How to apply as a freelancer">
                            <div className={PromptStyles.inputHeader}>
                                <span>
                                    Starting your freelancing career is simple! To apply, you need to provide one of the following valid Philippine government-issued IDs:
                                </span>
                                <ul>
                                    {validIDs.map(({ name, value }) => (
                                        <li key={name} value={value}>{name}</li>
                                    ))}
                                </ul>
                                <span>
                                    Once you have your valid ID ready, you can proceed with the application process, ensuring a smooth and hassle-free experience. Start your freelancing career today!
                                </span>
                            </div>
                            <div className={PromptStyles.footer}>
                                <div>
                                    <CancelBtn onClose={onHandleFreelancer} />
                                </div>
                            </div>
                        </Prompt>
                    </Dialog>
                    : null
            }
            {
                employer ?
                    <Dialog>
                        <Prompt title="How to Apply as Employer?">
                            <div className={PromptStyles.inputHeader}>
                                <span>
                                    Looking to hire talented freelancers? Here’s how to apply as an employer:

                                    To verify the legitimacy of your business, you’ll need to provide valid proof that your company exists. Acceptable documents include:
                                </span>
                                <ul>
                                    {EmployerIds.map(({ name, value }) => (
                                        <li key={name} value={value}>{name}</li>
                                    ))}
                                </ul>
                                <span>
                                    Once you have the necessary documents ready, you can proceed with the registration process, ensuring a smooth and hassle-free experience. Start building your team of freelancers today!
                                </span>
                            </div>
                            <div className={PromptStyles.footer}>
                                <div>
                                    <CancelBtn onClose={onHandleEmlpoyer} />
                                </div>
                            </div>
                        </Prompt>
                    </Dialog>
                    : null
            }
            <div className={styles.body}>
                <div className={styles.main}>
                    <h2>Your Gateway to Top Filipino Freelancers Post Jobs & Hire Talent Today!</h2>
                    <div className={styles.skills}>
                        {randomSkills.map((skills) => (
                            <div className={styles.skillsCard} key={skills}>
                                <span>{skills}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.jobPost}>
                    <h2>Latest Job Post</h2>
                    <Post />
                </div>
                <div id="companies" className={styles.companies}>
                    <h2>Top Companies</h2>
                    <Companies />
                </div>
                <div className={styles.about}>

                    <div className={styles.ey}>
                        <div className={styles.aboutMain}>
                            <h2>About Us</h2>
                            <p className={styles.description}>
                                At BeeHired, we channel the spirit of hard work and teamwork to connect Filipino freelancers with valuable opportunities. Our platform is establish to bring togetherdedicated freelancers and employers, fostering an environment where collaboration lead to success.
                            </p>
                        </div>

                        <div className={styles.image_grid}>
                            <div className={styles.image_box}>
                                <div className={styles.wrapper}>
                                    <Image src={About1} alt="Freelancer working" className={styles.img} height={300} width={300} priority />
                                </div>
                            </div>
                            <div className={styles.image_box}>
                                <div className={styles.wrapper}>
                                    <Image src={About2} alt="Freelancer working" className={styles.img} height={300} width={300} priority />
                                </div>
                            </div>
                            <div className={styles.image_box}>
                                <div className={styles.wrapper}>
                                    <Image src={About3} alt="Freelancer working" style={{

                                    }} className={styles.img} height={300} width={300} priority />
                                </div>
                            </div>
                            <div className={styles.image_box}>
                                <div className={styles.wrapper}>
                                    <Image src={About4} alt="Freelancer working" className={styles.img} height={300} width={300} priority />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.mission_vision}>
                        <div className={styles.mission}>
                            <div>
                                <h3>Our Mission</h3>
                                <p>In the way bees work together to build and sustain their hive, BeeHired is designed to foster a collaborative environment where Filipino freelancers and employers can seamlessly connect and thrive. Our platform embodies the principles of teamwork, efficiency, and growth, ensuring that every freelancer can find their place in the global marketplace.
                                </p>
                            </div>
                            <div className={styles.gap}>
                                <Image src={Mission} alt="" fill objectFit="cover" objectPosition="center" />
                            </div>
                        </div>
                        <div className={styles.vision}>
                            <div className={styles.gap}>
                                <Image src={Vision} alt="" fill objectFit="cover" objectPosition="center" />
                            </div>
                            <div>
                                <h3>Our Vision</h3>
                                <p>
                                    We envision a thriving freelance community where Filipino professionals have seamless access to local and global job markets. We strive to be the go-to resource for freelancers seeking to advance their careers, connect with top employers, and unlock their full potential.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={styles.freelancer}>

                    <div className={styles.text}>
                        <div className={styles.col1}>
                            <h2 className={BoldPoppins.className}>Empowering Filipino Freelancers</h2>
                            <span>Explore Job Oppurtunities and Be Hired Now!</span>

                        </div>
                        <div className={styles.col2}>
                            <div className={styles.asd}>
                                <div className={styles.iconsContainer}>
                                    <div className={styles.iconContainer}>
                                        <TbUserFilled size={45} style={{
                                            fill: "#fff"
                                        }} />
                                    </div>
                                    <span>Create an Account</span>
                                </div>
                                <div className={styles.iconsContainer}>
                                    <div className={styles.iconContainer}>
                                        <TbSearch size={45} />
                                    </div>
                                    <span>Find Jobs</span>
                                </div>
                                <div className={styles.iconsContainer}>
                                    <div className={styles.iconContainer}>
                                        <TbNotes size={45} />
                                    </div>
                                    <span>Apply for Jobs</span>
                                </div>
                                <div className={styles.iconsContainer}>
                                    <div className={styles.iconContainer}>
                                        <TbRocket size={45} />
                                    </div>
                                    <span>Start Work</span>
                                </div>
                            </div>
                            <button
                                onClick={onHandleFreelancer}
                                className={MediumPoppins.className}>How to Apply as Freelancer?</button>
                        </div>
                    </div>
                </div>


                <div className={styles.employer}>
                    <div className={styles.text}>
                        <h2 className={BoldPoppins.className}>Start your Project with BeeHired</h2>
                        <span className={BoldPoppins.className}>Work with Talented Filipino Freelancers</span>

                        <button
                            onClick={onHandleEmlpoyer}
                            className={MediumPoppins.className}>How to Apply as Employer?</button>
                    </div>
                    <div className={styles.gap}>

                    </div>
                    <div>

                    </div>
                </div>

                <div id="pricing" className={styles.pricing}>
                    <div className={styles.titleContainer}>
                        <h2 className={BoldPoppins.className}>Pricing</h2>
                    </div>
                    <div className={styles.pricingTable}>
                        <div className={styles.pricingCard}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <Image src={PricingBasic} alt="" height={65} width={65} />
                                    <h2>Basic</h2>
                                </div>
                                <div>
                                    <h3 className={RegularPoppins.className}>{Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(0)}
                                        <span className={RegularPoppins.className}>/month</span>
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.features}>
                                <ul>
                                    <li>21-Day Job Posting Duration</li>
                                    <li>1-Day Job Posting Creation Per Post</li>
                                    <li>Application Tracking System</li>
                                    <li>Schedule Management</li>
                                    <li>Project Organizer</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.pricingCard}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <Image src={PricingPro} alt="" height={65} width={65} />
                                    <h2 className={RegularPoppins.className}>Pro Account</h2>
                                </div>
                                <div>
                                    <h3 className={RegularPoppins.className}>{Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(399)}
                                        <span className={RegularPoppins.className}>/month</span>
                                    </h3>
                                </div>
                            </div>

                            <div className={styles.features}>
                                <ul>
                                    <li>Unlimited Job Posting</li>
                                    <li>90-Day Job Posting Duration</li>
                                    <li>Application Tracking System</li>
                                    <li>Schedule Management</li>
                                    <li>Project Organizer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div >
    )
}
