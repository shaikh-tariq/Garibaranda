import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="wrap page-head notfound">
        <div className="eyebrow">404</div>
        <h1 className="serif">This print has wandered off.</h1>
        <p className="lede">The page you are looking for is not here, but plenty of shirts are.</p>
        <Link to="/shop" className="btn">Back to the shop</Link>
      </section>
    </PageTransition>
  )
}
