import React from 'react'
import { PROD_DOMAIN, DEV_DOMAIN } from '../lib/constants'

export const meta = {
  name: 'PaprInk',
  title: 'PaprInk',
  social: 'wepaprink',
  website: 'https://PaprInk.com',
  meta_description: "PaprInk is made to inspire people to write everyday. In 21st century, everyone needs to develop a habit of writing all what they think in their minds.",
  meta_ogTitle: "PaprInk - Where writers flourish.",
  tagline: (<>Where writers flourish</>),
  image: "https://i.ibb.co/pQRG5ZT/PaprInk.jpg",
  favicon: `/static/favicon.ico`,
  email: `info@iqubex.com`,
  domain: process.env.NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN
}