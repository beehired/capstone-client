import React from 'react'
import styles from '@/styles/dashboard/search.module.scss';
import { TbSearch } from 'react-icons/tb';


interface Props {
    onChange: any
}
export default function Search({ onChange }: Props) {
    return (
        <div className={styles.container}>
            <TbSearch size={23} />
            <input aria-label='search' type="text" placeholder='Search here...' onChange={onChange} />
        </div>
    )
}
