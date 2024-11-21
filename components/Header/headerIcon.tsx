import React from 'react'
import styles from '@/styles/components/Headers/header.module.scss';
import { ButtonIcon, RouteButtonV1, RouteButtonV2 } from '../button';
import { TbSearch } from 'react-icons/tb';


export default function HeaderIcon() {

    return (
        <div className={styles.container}>
            <RouteButtonV2 name='Login' url='/auth/login' />
        </div>
    )
}
