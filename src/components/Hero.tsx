import type { FC } from 'react'

interface HeroProps {
  onExploreClick: () => void
}

const Hero: FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Bienvenido a CafeteriaHub</h2>
        <p>Descubre nuestro menú premium de café, postres y comidas artesanales</p>
        <button className="hero-button" onClick={onExploreClick}>
          Explorar Menú
        </button>
      </div>
    </section>
  )
}

export default Hero
