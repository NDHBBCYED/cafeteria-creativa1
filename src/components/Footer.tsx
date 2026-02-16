import type { FC } from 'react'

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>CafeteriaHub</h4>
          <p>Ofrecemos café premium, postres artesanales y comidas saludables para satisfacer tus gustos.</p>
          <div className="social-links">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="Twitter">𝕏</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Horario</h4>
          <p><strong>Lunes - Viernes:</strong> 7:00 AM - 7:00 PM</p>
          <p><strong>Sábado - Domingo:</strong> 9:00 AM - 6:00 PM</p>
          <p><strong>Festivos:</strong> 10:00 AM - 5:00 PM</p>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📞 +1 (555) 123-4567</p>
          <p>📧 info@cafeteriahub.com</p>
          <p>📍 123 Coffee Street, City</p>
        </div>

        <div className="footer-section">
          <h4>Información</h4>
          <ul className="footer-links">
            <li><a href="#about">Acerca de Nosotros</a></li>
            <li><a href="#privacy">Privacidad</a></li>
            <li><a href="#terms">Términos</a></li>
            <li><a href="#faq">Preguntas Frecuentes</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} CafeteriaHub. Todos los derechos reservados. | Diseño Profesional</p>
      </div>
    </footer>
  )
}

export default Footer
