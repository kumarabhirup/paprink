import checkLoggedIn from "./checkLoggedIn"

export const getLoginUser = Page => {
    return class extends React.Component {

        static async getInitialProps (context, apolloClient) {
          const { loggedInUser } = await checkLoggedIn(context.apolloClient)

          if (!loggedInUser.me) {
            // If not signed in, send them somewhere more useful
            redirect(context, '/signin')
          }

          return { loggedInUser }
        }

        render() {
            return <Page {...this.props} />
        }

    }
}