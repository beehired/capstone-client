import React from 'react'
import { TbSearch } from 'react-icons/tb'
import styles from '@/styles/components/search.module.scss';
import { PrimaryButton } from './button';

export default function Search() {
    return (
        <div className={styles.container}>
            <TbSearch size={25} />
            <input aria-label='seach' type="text" placeholder='search job, keywords, and etc' />
        </div>
    )
}
