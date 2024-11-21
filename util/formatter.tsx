import React from 'react'
import { isValid, format, formatDistanceToNowStrict } from 'date-fns'


export function Formatter(value: any) {


    let formattedDate = ""

    if (value) {
        const date = typeof value === "string" ? new Date(value) : value

        if (isValid(date)) {
            formattedDate = format(date, "MMM dd, yyyy")
        }
    }
    return (
        <span>{formattedDate}</span>
    )
}

export function FormatterDistance(value: any) {
    let formatedDate = ""

    if (value) {
        const date = typeof value === "string" ? new Date(value) : value

        if (isValid(date)) {
            formatedDate = formatDistanceToNowStrict(new Date(date), { addSuffix: true })
        }
    }

    return <span>{formatedDate}</span>
}