export default function cloudinaryUrlOptimizer(url) {
  const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_USERNAME}/image/upload/`

  if (url && ~url.indexOf('q_auto') && ~url.indexOf('f_auto') && ~url.indexOf(baseUrl)) return url // return it back if Url is already optimized

  const optimizedUrl = url && url.replace(baseUrl, `${baseUrl}q_auto,f_auto/`)

  return optimizedUrl
}