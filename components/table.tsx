"use client"
import React from 'react'
import styles from '@/styles/components/table.module.scss'
import { TbChevronLeft, TbChevronRight, TbChevronUp } from 'react-icons/tb'
import { RegularPoppins } from './typograhy'

export default function Table() {
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <div></div>
                <div>
                    <span className={RegularPoppins.className}>Check</span>
                </div>
                <div>
                    <span className={RegularPoppins.className}>Check</span>
                </div>
                <div>
                    <span className={RegularPoppins.className}>Check</span>
                </div>
            </div>
            <div className={styles.tableBody}></div>
            <div className={styles.tableFooter}>
                <span className={RegularPoppins.className}>Showing 10 of 20 of 200 entries</span>
                <div>
                    <button>
                        <TbChevronLeft size={18} />
                    </button>
                    <span className={RegularPoppins.className
                    }>1</span>
                    <button>
                        <TbChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
