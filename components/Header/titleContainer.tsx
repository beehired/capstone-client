"use client"
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
    image: any
}

export default function TitleContainer({ image }: Props) {

    const router = useRouter();

    return (
        <div>
            <Image onClick={() => router.push("/")} src={image} alt="beehired" height={80} width={80} priority />
        </div>
    )
}
