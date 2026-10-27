import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Crop from './Crop.jsx'
import { priceLabel } from '../data/products.js'

// forwardRef lets the Shop filter animate cards in and out (AnimatePresence needs a ref).
const ProductCard = forwardRef(function ProductCard({ product, index = 0 }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="card"
    >
      <Link to={`/shop/${product.slug}`} className="card__link">
        <Crop src={product.image} crop={product.crop} alt={`${product.name} shirt`} className="card__img">
          <span className="card__tag">{product.tag}</span>
          <span className="card__view">View print →</span>
        </Crop>
        <div className="card__body">
          <h3 className="serif">{product.name}</h3>
          <p className="card__meta">{product.fabric} · {product.print.split(',')[1]?.trim() ?? product.print}</p>
          <div className="card__row">
            <span className="card__price">{priceLabel(product)}</span>
            <span className="card__swatch" style={{ background: product.swatch }} aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
})

export default ProductCard
