"use client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import CreateUploadLink from 'apollo-upload-client/createUploadLink.mjs';

function makeClient() {
    const httpLink = CreateUploadLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        headers: {
            "apollo-require-preflight": 'true'
        },
        fetchOptions: {
            cache: "force-cache"
        }
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: false,
        defaultOptions: {
            query: {
                fetchPolicy: "cache-first",
            }
        },
        devtools: {
            enabled: true
        },
        link: httpLink,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}