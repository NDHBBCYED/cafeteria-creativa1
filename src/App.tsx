import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import Footer from './components/Footer'

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

interface CartItem extends Product {
  quantity: number
}

interface Category {
  id: string
  name: string
  icon: string
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  
  const [showCart, setShowCart] = useState(false)
  const [activeCategory, setActiveCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')

  const products: Product[] = [
    { id: 1, name: 'Espresso Italiano', description: 'Café espresso puro y concentrado. 30ml de puro placer', price: 2.50, category: 'cafe', icon: '☕', rating: 5, reviews: 234 },
    { id: 2, name: 'Cappuccino Artesanal', description: 'Espresso con leche vaporizada y espuma cremosa', price: 3.50, category: 'cafe', icon: '☕', rating: 5, reviews: 312 },
    { id: 3, name: 'Latte Clásico', description: 'Café suave con leche cremosa y cacao', price: 3.50, category: 'cafe', icon: '☕', rating: 4, reviews: 198 },
    { id: 4, name: 'Americano', description: 'Espresso diluido en agua caliente. Suave y largo', price: 3.00, category: 'cafe', icon: '☕', rating: 4, reviews: 156 },
    { id: 5, name: 'Macchiato Doble', description: 'Espresso manchado con leche espumosa', price: 3.25, category: 'cafe', icon: '☕', rating: 5, reviews: 289 },
    { id: 6, name: 'Mocha Premium', description: 'Café con chocolate belgaumado y leche vaporizada', price: 4.00, category: 'cafe', icon: '☕', rating: 5, reviews: 401 },
    { id: 7, name: 'Croissant Francés', description: 'Hojaldre francés clásico, crujiente y mantecoso', price: 3.00, category: 'postres', icon: '🥐', rating: 5, reviews: 267 },
    { id: 8, name: 'Brownies de Chocolate', description: 'Brownies de chocolate casero, denso y sabroso', price: 2.75, category: 'postres', icon: '🍫', rating: 5, reviews: 345 },
    { id: 9, name: 'Cheesecake Artesanal', description: 'Pastel de queso artesanal con base de galleta', price: 4.50, category: 'postres', icon: '🍰', rating: 5, reviews: 423 },
    { id: 10, name: 'Muffin Premium', description: 'Muffin de arándanos o chocolate belga', price: 2.50, category: 'postres', icon: '🧁', rating: 4, reviews: 178 },
    { id: 11, name: 'Donas Gourmet', description: 'Donas glaseadas con sabores como vainilla y fresa', price: 2.25, category: 'postres', icon: '🍩', rating: 4, reviews: 289 },
    { id: 12, name: 'Sandwich Tostado Gourmet', description: 'Sándwich de jamón ibérico y queso artesanal', price: 5.50, category: 'alimentos', icon: '🥪', rating: 5, reviews: 312 },
    { id: 13, name: 'Wrap de Pollo a la Parrilla', description: 'Wrap con pollo a la parrilla, verduras frescas y salsa casera', price: 6.00, category: 'alimentos', icon: '🌯', rating: 5, reviews: 298 },
    { id: 14, name: 'Ensalada Mixta Premium', description: 'Ensalada fresca con aderezo balsámico de la casa', price: 5.00, category: 'alimentos', icon: '🥗', rating: 4, reviews: 234 },
    { id: 15, name: 'Panini de Verduras Rostizadas', description: 'Panini con verduras a la parrilla y queso mozzarella', price: 5.25, category: 'alimentos', icon: '🥙', rating: 5, reviews: 267 },
    { id: 16, name: 'Jugo Natural Fresco', description: 'Jugo de naranja recién exprimido cada mañana', price: 3.50, category: 'bebidas', icon: '🧃', rating: 5, reviews: 412 },
    { id: 17, name: 'Smoothie Tropical', description: 'Batido de frutas tropicales con yogurt griego', price: 4.00, category: 'bebidas', icon: '🥤', rating: 5, reviews: 389 },
    { id: 18, name: 'Té Helado Premium', description: 'Té refrescante con hielo y limón fresco', price: 2.75, category: 'bebidas', icon: '🧋', rating: 4, reviews: 201 },
  ]

  const categories: Category[] = [
    { id: 'todos', name: 'Panel', icon: '📋' },
    { id: 'cafe', name: 'Café', icon: '☕' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'alimentos', name: 'Comida', icon: '🥪' },
    { id: 'bebidas', name: 'Bebidas', icon: '🧃' }
  ]

  // Guardar cart en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).map(p => ({
    ...p,
    isFavorite: favorites.includes(p.id)
  }))

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleCheckout = () => {
    alert(`¡Gracias por tu compra! Total: $${(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.10).toFixed(2)}`)
    setCart([])
    setShowCart(false)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      <Header 
        cartItems={totalItems} 
        onCartClick={() => setShowCart(!showCart)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {!showCart && <Hero onExploreClick={() => setActiveCategory('cafe')} />}

      <main className="container">
        {showCart ? (
          <Cart 
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        ) : (
          <>
            <Categories 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <section className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onToggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                <div className="no-products">
                  <p>No se encontraron productos</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
