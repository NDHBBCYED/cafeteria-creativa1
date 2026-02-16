import type { FC } from 'react'

interface Category {
  id: string
  name: string
  icon: string
}

interface CategoriesProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

const Categories: FC<CategoriesProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <section className="categories">
      {categories.map(cat => (
        <button 
          key={cat.id}
          className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span className="category-icon">{cat.icon}</span>
          <span className="category-name">{cat.name}</span>
        </button>
      ))}
    </section>
  )
}

export default Categories
