"use client"
import React from 'react'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import styles from '@/styles/components/pagination.module.scss';
import { MediumPoppins } from './typograhy';


interface Props {
    itemsPerPage: number,
    nextButton: any,
    prevButton: any,
    totalPages: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    totalItems: number,
    currentPage: number
}

export default function Pagination({ itemsPerPage, nextButton, totalPages, hasPrevPage, hasNextPage, prevButton, currentPage, totalItems }: Props) {

    return (
        <div className={styles.container}>

            <div className={styles.showresult}>
                <span className={MediumPoppins.className}>Showing {currentPage} to {itemsPerPage}  of {totalItems} entries</span>
            </div>

            <div className={styles.paginate}>
                <button aria-label='Previous Button' disabled={hasPrevPage ? false : true} onClick={prevButton}>
                    <TbChevronLeft size={20} />
                </button>
                <div>
                    <span className={MediumPoppins.className}>{currentPage}</span>
                </div>
                <button aria-label='Next button' disabled={hasNextPage ? false : true} onClick={nextButton}>
                    <TbChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
