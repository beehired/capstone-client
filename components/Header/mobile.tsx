"use client";



import React, { useState } from 'react'
import { TbMenu2, TbUser } from 'react-icons/tb'
import { ButtonIconRoute, ButtonIconToggle } from '../button'
import TitleContainer from './titleContainer'
import styles from '@/styles/components/Headers/mobile.module.scss'
import Logo from '@/app/public/beehired.png';
export default function Mobile() {

    const [menuToggle, setMenuToggle] = useState(false);

    const [login, setLogin] = useState(false);

    return (
        <div className={styles.container}>
            <TitleContainer image={Logo} />
            <ButtonIconRoute icon={<TbUser size={23} />} url='/auth/login' />
        </div>
    )
}
