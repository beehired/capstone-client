"use client"


import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'


import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
interface Props {
    children: ReactNode
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined


function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()

        return browserQueryClient
    }
}

export const queryClient = getQueryClient();

export default function Provider({ children }: Props) {

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} position='left' buttonPosition='bottom-left' />
        </QueryClientProvider>
    )
}
