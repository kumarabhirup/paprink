import { CURRENT_USER_QUERY } from "../components/User"

export default apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER_QUERY
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })