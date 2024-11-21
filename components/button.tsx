"use client"
import React, { SyntheticEvent, useEffect, useRef } from 'react'
import styles from '@/styles/components/button.module.scss';
import { RegularPoppins } from '@/components/typograhy'
import { useRouter, usePathname } from 'next/navigation';
import { Rings } from 'react-loader-spinner'
import Spinner from './spinner';
import { TbChevronLeft } from 'react-icons/tb';

interface Props {
    name: string
    type: 'submit' | 'button' | 'reset'
    loading: boolean
}

export function PrimaryButton({ name, type, loading }: Props) {
    return (
        <button type={type} disabled={loading} className={styles.container}>
            {loading ? <Spinner /> : <span className={RegularPoppins.className}>{name}</span>}

        </button>

    )
}


interface CancelBtnProps {
    onClose: any
}
export function CancelBtn({ onClose }: CancelBtnProps) {
    return (
        <button onClick={onClose} className={styles.cancelBtn} type="button">
            <span className={RegularPoppins.className}>Cancel</span>
        </button>
    )
}

export function DeleteBtn() {
    return (
        <button className={styles.deleteBtn} type="submit">
            <span className={RegularPoppins.className}>Delete</span>
        </button>
    )
}

interface RouteBtn {
    name: string
    url: string
}

export function RouteButtonV1({ name, url }: RouteBtn) {

    const router = useRouter();

    const onHandleRoute = () => {
        router.push(url)
    }

    return (
        <button type="button" onClick={onHandleRoute} className={styles.routingBtnV1}>
            <span className={RegularPoppins.className}>{name}</span>
        </button>
    )
}

export function RouteButtonV2({ name, url }: RouteBtn) {


    const router = useRouter();

    const onHandleRoute = () => {
        router.push(url)
    }
    return (
        <button type="button" onClick={onHandleRoute} className={styles.routingBtnV2}>
            <span className={RegularPoppins.className}>{name}</span>
        </button>
    )
}

interface ButtonIconProps {
    icon: any,
    name: string,
    url: string
}

export function ButtonIcon({ icon, name, url }: ButtonIconProps) {

    const router = useRouter();
    const pathname = usePathname();


    const onHandleRouting = () => {
        router.push(url)
    }

    return (
        <button onClick={onHandleRouting} className={pathname.includes(name.toLowerCase()) ? `${styles.iconBtn} ${styles.activeIcon}` : `${styles.iconBtn}`}>
            <div className={styles.con}>
                {icon}
                <span className={RegularPoppins.className} > {name}</span >
            </div>
        </button >

    )
}


interface ButtonMobileToggle {
    value: any
    setValue: any
    icon: any,
}

export function ButtonIconToggle({ value, setValue, icon }: ButtonMobileToggle) {

    const onHandleToggleBtn = () => {
        setValue((prev: any) => !prev)
    }

    return (
        <button className={styles.toggleBtn} onClick={onHandleToggleBtn}>
            {icon}
        </button>
    )
}



interface ButtonStepState {
    icon?: any,
    icon2?: any,
    name: string
    disabled: boolean
    onHandleClick: () => void
}


export function ButtonStepState({ icon, disabled, name, icon2, onHandleClick }: ButtonStepState) {


    return (
        <button disabled={disabled} className={styles.ButtonStepState} type="button" onClick={onHandleClick}>
            {icon}
            <span className={RegularPoppins.className}>{name}</span>
            {icon2}
        </button>
    )
}


interface ButtonStateProps {
    name: string
    value: any
    setValue: any
}


export const ButtonState = ({ name, value, setValue }: ButtonStateProps) => {


    const onHandleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <button className={value === name ? styles.activeState : styles.buttonState} onClick={onHandleClick} value={name}>
            <span className={RegularPoppins.className}>{name}</span>
        </button>
    )
}



interface ButtonIconRouteProps {
    icon: any,
    url: string
}
export const ButtonIconRoute = ({ icon, url }: ButtonIconRouteProps) => {

    const router = useRouter();
    return (
        <button onClick={() => router.push(url)} className={styles.ButtonIconRoute}>
            {icon}
        </button>
    )
}

export const ButtonGoBack = () => {

    const router = useRouter();

    return (
        <button className={styles.goback} onClick={() => router.back()}>
            <TbChevronLeft size={23} />
            <span className={RegularPoppins.className}> Go Back</span>
        </button>
    )
}