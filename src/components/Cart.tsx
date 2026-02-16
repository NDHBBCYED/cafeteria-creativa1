import type { FC } from 'react'

interface CartItem {
  id: number
  name: string
  icon: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemove: (productId: number) => void
  onCheckout: () => void
}

const Cart: FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.10
  const total = subtotal + tax

  if (items.length === 0) {
    return (
      <div className="cart-section">
        <h2>🛒 Tu Carrito</h2>
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <p className="empty-message">¡Empieza a agregar productos!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-section">
      <h2>🛒 Tu Carrito de Compras</h2>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="item-icon">{item.icon}</span>
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-price">${item.price.toFixed(2)} c/u</p>
              </div>
            </div>

            <div className="quantity-control">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div className="item-total">
              <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => onRemove(item.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Impuesto (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          Proceder al Pago
        </button>
      </div>
    </div>
  )
}

export default Cart
