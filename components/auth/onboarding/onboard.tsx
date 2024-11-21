"use client"


import React, { useEffect } from 'react'

import store from 'store2';
import { useRouter } from 'next/navigation';


export default function Onboard() {

    const router = useRouter();
    const user = store.get("UserAccount");

    useEffect(() => {
        switch (user?.role) {
            case "admin":
                router.push('/dashboard/admin/overview?filter=week')
                break;
            case "recruiter":
                router.push('/dashboard/employer/overview?filter=week')
                break;
            case "freelance":
                router.push("/freelancer/my-projects")
                break;
        }
    })
    return (
        <>

        </>
    )
}
