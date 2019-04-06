import { categorySuggessions } from '../api/mini'
export default function categorySorter(categories) {
  const categoryArray = categories.map(category => ( category.category.toLowerCase() ))
  const categoryState = categorySuggessions.filter(({id}) => {
    return categoryArray.includes(id)
  })
  return categoryState
}