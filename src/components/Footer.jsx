import { Link } from 'react-router-dom'
import { DM_LINK, INSTAGRAM_HANDLE } from '../data/products.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="logo logo--light">GARIBARANDA</div>
          <p className="footer__tag">Crafting shirts &amp; similars rooted in Bengal, redefining comfort with signature handblocks.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop all prints</Link>
          <Link to="/craft">Our craft</Link>
          <Link to="/custom">Custom made</Link>
          <Link to="/order">How to order</Link>
        </div>
        <div>
          <h4>Say hello</h4>
          <a href={DM_LINK} target="_blank" rel="noreferrer">DM on Instagram</a>
          <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noreferrer">@{INSTAGRAM_HANDLE}</a>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© 2026 Garibaranda</span>
        <span>Concept design — not a live store</span>
      </div>
    </footer>
  )
}
