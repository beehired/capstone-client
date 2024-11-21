"use client"

import React, { ReactNode } from 'react'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


interface Props {
    children: ReactNode
}

export default function ProgressBars({ children }: Props) {
    return (
        <div>
            {children}
            <ProgressBar
                height="4px"
                color="#ffd700"
                options={{ showSpinner: true }}
                shallowRouting={true}
                disableSameURL={false}
                
            />
        </div>
    )
}
