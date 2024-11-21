import React from 'react'
import styles from '@/styles/notfound.module.scss'
import { MediumPoppins } from '@/components/typograhy'
import Header from '@/components/header'
import TitleContainer from '@/components/Header/titleContainer'
import { HrefLinkV1 } from '@/components/link'
import Logo from '@/app/public/beehired.png';
import { Metadata } from 'next'
import Footer from '@/components/footer'
import { TbArrowLeft } from 'react-icons/tb'


export const metadata: Metadata = {
    title: "404-Not Found",
    creator: "UST-CICS Group 7 BeeHired",
    icons: "/favicon.ico",
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



export default function NotFound() {
    return (
        <div className={styles.container}>
            <Header>
                <TitleContainer image={Logo} />
            </Header>
            <div className={styles.body}>
                <div className={styles.bodyHeader}>
                    <h2 className={MediumPoppins.className}>Error 404: Not Found</h2>
                    <span>Oops! The page you are looking for does not exist.</span>
                    <div className={styles.goback}>
                        <TbArrowLeft size={23} />
                        <HrefLinkV1 name='Go Back' url='/' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
