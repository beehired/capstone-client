import MessageList from '@/components/dashboard/job/message/messageList'
import React, { ReactNode } from 'react'
import styles from '@/styles/dashboard/message/message.module.scss'

interface Props {
    children: ReactNode
}
export default function Template({ children }: Props) {
    return (
        <div className={styles.container}>
            <MessageList />
            {children}
        </div>
    )
}
