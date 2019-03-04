import { meta } from "./meta"

export const mainMenu = [
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
  },
  {
    text: `SignIn`,
    sku: `signin`,
    link: `${meta.domain}/login`,
    newTab: false
  }
]