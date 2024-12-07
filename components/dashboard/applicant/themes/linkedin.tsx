"use client"

import React, { useEffect, useState } from 'react'
import styles from '@/styles/dashboard/applicant/themes/theme2.module.scss'
import { TbBrandFacebook, TbBrandGithub, TbBrandInstagram, TbBrandX, TbDiamond, TbWorldWww } from 'react-icons/tb'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GetUserByProfileId } from '@/util/Query/profile.query'
import { Lato, Poppins } from 'next/font/google';
import DefaultImage from '@/app/public/l60Hf.png';
import Image from 'next/image'
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable'
import { RegularPoppins } from '@/components/typograhy'
import { Rating, RoundedStar } from '@smastrom/react-rating'

const lato = Lato({
    weight: "400",
    display: "auto",
    subsets: ["latin"]
})
const poppins = Poppins({
    weight: "400",
    display: "auto",
    subsets: ["latin"]
})

export default function LinkedIn({ id }: any) {

    const { data, isLoading } = useQuery({
        queryKey: ["GetUserProfileById", id],
        queryFn: async () => {
            const { getUserProfileById } = await GraphQLRequest(GetUserByProfileId, {
                profileId: id
            })

            return getUserProfileById
        },
    })

    const [fonts, setFont] = useState("")

    useEffect(() => {
        if (data?.getMyFont?.font) {
            switch (data?.getMyFont.font) {
                case "Lato":
                    setFont(lato.className);
                    break
                case "Poppins":
                    setFont(poppins.className);
                    break
            }
        }
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.header} >
                <div className={styles.head} style={{
                    backgroundImage: `url(${data?.header?.media})`,
                    objectFit: "contain"
                }}></div>
                <div className={styles.avatar}>
                    <Image src={isEmpty(data?.avatar?.media) ? DefaultImage : data.avatar.media} alt="" objectFit='cover' objectPosition='center' fill priority />
                </div>
                <div className={styles.socmed}>
                    <Link aria-label='instagram' target="_blank" href={`${data?.social?.instagram}`}>
                        <TbBrandInstagram size={25} />
                    </Link>
                    <Link aria-label='facebook' target="_blank" href={`${data?.social?.facebook}`}>
                        <TbBrandFacebook size={25} />
                    </Link>
                    <Link aria-label='github' target="_blank" href={`${data?.social?.Github}`}>
                        <TbBrandGithub size={25} />
                    </Link>
                    <Link aria-label='x' target="_blank" href={`${data?.social?.X}`}>
                        <TbBrandX size={25} />
                    </Link>
                    <Link aria-label='web' target="_blank" href={`${data?.social?.Web}`}>
                        <TbWorldWww size={25} />
                    </Link>
                </div>
                <div className={styles.name}>
                    <h2>{data?.firstname} {data?.lastname}</h2>
                </div>
            </div>
            <div className={styles.about}>
                <div className={styles.aboutTitle}>
                    <h2 className={RegularPoppins.className}>About</h2>
                    <p>
                        {data?.about?.bio}
                    </p>
                </div>
                <div className={styles.skills}>
                    <div className={styles.skillHeader}>
                        <TbDiamond size={23} />
                        <h2 className={RegularPoppins.className}>Top Skills</h2>
                    </div>
                    <div className={styles.skill}>
                        {data?.skills.map(({ skillsID, skills }: { skillsID: any, skills: any }) => (
                            <span className={fonts} key={skills}>{skills}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.work}>
                <div className={styles.workTitle}>
                    <h2>Work Experience</h2>
                </div>
                {isEmpty(data?.portfolio) ? <NotAvailable /> : data?.portfolio.map(({ portfolioID, title, startYear, startMonth, endYear, endMonth, location, companyName, description, locationType, employmentType, skills }: any) => (
                    <div key={portfolioID} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={RegularPoppins.className}>{title}</h2>
                        </div>
                        <div>
                            <span className={fonts}> {companyName} &#x2022; {locationType}</span>
                        </div>
                        <div>
                            <span className={fonts}> {startMonth} {startYear} -  {endMonth} {endYear}</span>
                        </div>
                        <div>
                            <span className={fonts}> {location} &#x2022;  {employmentType}</span>
                        </div>
                        <p>{description}</p>
                        <div className={styles.skilled}>
                            {skills.map(({ skills: skilled }: { skills: any }) => (
                                <span className={fonts} key={skilled}>{skilled}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.work}>
                <div className={styles.workTitle}>
                    <h2 className={RegularPoppins.className}>Education Background</h2>
                </div>
                {isEmpty(data?.education) ? <NotAvailable /> : data?.education.map(({ educationID, degree, endMonth, endYear, school, startMonth, startYear, study }: any) => (
                    <div key={educationID} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={RegularPoppins.className}>{school}</h2>
                        </div>
                        <div>
                            <span className={fonts}>{degree} in {study} </span>
                        </div>
                        <div>
                            <span className={fonts}> {startMonth} {startYear} -  {endMonth} {endYear}</span>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.work}>
                <div className={styles.workTitle}>
                    <h2 className={RegularPoppins.className}>Reviews</h2>
                </div>
                {isEmpty(data?.review) ? <NotAvailable /> :
                    data?.review.map(({ reviewID, review, rating, company }: any) => (
                        <div className={styles.reviewCard} key={reviewID}>
                            <Rating id='rating' style={{ maxWidth: 100 }} value={rating} readOnly itemStyles={{
                                itemShapes: RoundedStar,
                                activeFillColor: '#ffb700',
                                inactiveFillColor: '#fbf1a9'
                            }} />
                            <span className={fonts}>{review}</span>
                        </div>
                    ))}
            </div>
            <div className={styles.footer}>
                <span className={fonts}>All Rights Reserved BeeHired &copy; 2024</span>
            </div>
        </div>
    )
}
function GraphQLRequest(GetUserByProfileId: any, arg1: { profileId: any }): { getUserProfileById: any } | PromiseLike<{ getUserProfileById: any }> {
    throw new Error('Function not implemented.')
}

