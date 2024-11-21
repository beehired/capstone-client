import React from 'react'
import Image from 'next/image';

interface Props {
    image: any
}

export default function TitleContainer({ image }: Props) {
    return (
        <div>
            <Image src={image} alt="beehired" height={80} width={80} priority />
        </div>
    )
}
