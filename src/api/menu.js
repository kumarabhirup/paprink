import { meta } from "./meta"

export const mainMenu = [
  {
    text: `Home`,
    link: `${meta.domain}`,
    newTab: false
  },
  {
    text: `About`,
    link: `${meta.domain}/about`,
    newTab: false
  },
  {
    text: `Write a Post`,
    link: `${meta.domain}/write`,
    newTab: false
  },
  {
    text: `Signup`,
    link: `${meta.domain}/login`,
    newTab: false
  }
]