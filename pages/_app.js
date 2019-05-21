import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withData from '../src/lib/with-apollo-client'
import Page from '../src/components/Page'
import checkLoggedIn from '../src/lib/checkLoggedIn'

class Wrapper extends App {

    static async getInitialProps({Component, ctx}){

        let pageProps = {}
        const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx)
        }

        // This exposes query to the user
        pageProps.query = ctx.query
        return { pageProps, loggedInUser }
        
    }

    render() {
        const { Component, apolloClient, pageProps, loggedInUser } = this.props
        console.log(loggedInUser)
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Page>
                        <div className="super_container"><Component {...pageProps} /></div>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }

}


export default withData(Wrapper)