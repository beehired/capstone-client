"use client";



import React, { useState } from 'react'
import { TbMenu2, TbUser } from 'react-icons/tb'
import { ButtonIconToggle } from '../button'
import TitleContainer from './titleContainer'
import styles from '@/styles/components/Headers/mobile.module.scss'
import Logo from '@/app/public/beehired.png';
export default function Mobile() {

    const [menuToggle, setMenuToggle] = useState(false);

    const [login, setLogin] = useState(false);

    return (
        <div className={styles.container}>
            <ButtonIconToggle icon={<TbMenu2 size={25} />} setValue={setMenuToggle} value={menuToggle} />
            <TitleContainer image={Logo} />
            <ButtonIconToggle icon={<TbUser size={25} />} value={login} setValue={setLogin} />
        </div>
    )
}
