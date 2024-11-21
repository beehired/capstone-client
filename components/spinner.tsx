"use client"



import React from 'react'
import { ColorRing } from 'react-loader-spinner'
export default function Spinner() {
    return (
        <>
            <ColorRing
                colors={["#A3A3A3", "#A3A3A3", "#A3A3A3", "#A3A3A3", "#A3A3A3"]}
                height={35}
                width={35}
            />
        </>
    )
}
