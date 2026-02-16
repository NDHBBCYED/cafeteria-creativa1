import type { FC } from 'react'

interface HeaderProps {
  cartItems: number
  onCartClick: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const Header: FC<HeaderProps> = ({ cartItems, onCartClick, searchQuery, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>☕ CafeteriaHub</h1>
          <p>Premium Coffee Experience</p>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <button className="cart-button" onClick={onCartClick}>
          🛒 Carrito ({cartItems})
        </button>
      </div>
    </header>
  )
}

export default Header
