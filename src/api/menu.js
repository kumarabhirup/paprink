import { meta } from "./meta"
import { getCurrentUser } from "../components/User"

const me = async () => {return await getCurrentUser().then(value => (value))}

var mainMenu = [
  {
    text: `Home`,
    sku: `home`,
    link: `${meta.domain}`,
    newTab: false
  },
  {
    text: `About`,
    sku: `about`,
    link: `${meta.domain}/about`,
    newTab: false
  },
  {
    text: `Write a Post`,
    sku: `write`,
    link: `${meta.domain}/write`,
    newTab: false
  }
]

// async function signInLogic() {
//   if(await me().then(value => (value.data.me)) === null){
//     await mainMenu.push({
//       text: `Sign In`,
//       sku: `signin`,
//       link: `${meta.domain}/login`,
//       newTab: false
//     })
//   } else {
//     await mainMenu.push({
//       text: `Sign Out`,
//       sku: `signout`,
//       link: `${meta.domain}/signout`,
//       newTab: false
//     })
//   }
// } signInLogic()

export { mainMenu }
