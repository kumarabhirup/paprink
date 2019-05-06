import React from 'react'

export const meta = {
  name: 'PaprInk',
  title: 'PaprInk',
  social: 'wepaprink',
  website: 'https://PaprInk.com',
  meta_description: "PaprInk",
  meta_ogTitle: "PaprInk",
  tagline: (<></>),
  image: "https://i.ibb.co/pQRG5ZT/PaprInk.jpg",
  favicon: `/static/favicon.ico`,
  email: `info@iqubex.com`,
  domain: process.env.NODE_ENV === "production" ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN
}