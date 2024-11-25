import React from 'react'
import TitleContainer from './titleContainer'
import { RouteButtonV1, RouteButtonV2 } from '../button'
import styles from '@/styles/components/Headers/web.module.scss';
import LinkContainer from './LinkContainer';
import { HrefLinkV1 } from '../link';
import LogoImage from '@/app/public/beehired.png'


export default function Web() {


    return (
        <div className={styles.container}>
            <TitleContainer image={LogoImage} />
            <LinkContainer>
                <HrefLinkV1 name='Home' url='/' />
                <HrefLinkV1 name='Companies' url='#companies' />
                <HrefLinkV1 name='About Us' url='#about' />
                <HrefLinkV1 name='Pricing' url='#pricing' />
            </LinkContainer>
            <div className={styles.authentication}>
                <RouteButtonV2 name='Login' url='/auth/login' />
                <RouteButtonV1 name='Create an Account' url='/auth/register' />
            </div>
        </div>
    )
}
