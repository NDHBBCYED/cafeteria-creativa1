import type { FC } from 'react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  icon: string
  rating?: number
  reviews?: number
  isFavorite?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, onToggleFavorite }) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">{product.icon}</div>
        <button 
          className={`favorite-btn ${product.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          title={product.isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          {product.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      
      {product.rating && (
        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
          <span className="review-count">({product.reviews} reseñas)</span>
        </div>
      )}
      
      <div className="product-footer">
        <span className="price">${product.price.toFixed(2)}</span>
        <button 
          className="add-btn"
          onClick={() => onAddToCart(product)}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default ProductCard
