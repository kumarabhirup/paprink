import { meta } from "./meta"

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
    link: `${meta.domain}/editor/new`,
    newTab: false
  }
]

export { mainMenu }
