import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Crop from '../components/Crop.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useToast } from '../components/Toast.jsx'
import { copyOnly, sendOrder } from '../components/order.js'
import { SIZES, bySlug, priceLabel, products } from '../data/products.js'
import NotFound from './NotFound.jsx'

export default function Product() {
  const { slug } = useParams()
  const product = bySlug(slug)
  const toast = useToast()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [openRow, setOpenRow] = useState('details')
  const [shake, setShake] = useState(0)

  if (!product) return <NotFound />

  const message = `Hi Garibaranda! I'd like to order the ${product.name} shirt${size ? `, size ${size}` : ''}, quantity ${qty}. Could you share the price and delivery details?`

  const needSize = () => {
    if (!size) {
      setShake((s) => s + 1)
      toast('Pick a size first')
      return true
    }
    return false
  }

  const onOrder = async () => {
    if (needSize()) return
    const copied = await sendOrder(message)
    toast(copied ? 'Message copied. Paste it in the DM that just opened.' : 'Opening Instagram. Please type your order in the DM.')
  }

  const onCopy = async () => {
    if (needSize()) return
    toast((await copyOnly(message)) ? 'Order message copied' : 'Could not copy')
  }

  const rows = [
    { id: 'details', t: 'Details', d: `${product.print}. Fabric: ${product.fabric}. Every shirt is hand-block printed, so small variations in the print are part of the charm.` },
    { id: 'care', t: 'Care', d: 'Wash cold with like colours, dry in the shade and iron on the reverse. Dyes are azo-free.' },
    { id: 'delivery', t: 'Ordering & delivery', d: 'Send your order as a DM. We confirm the price, stock and delivery time with you directly.' },
  ]

  const more = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <PageTransition>
      <section className="wrap product">
        <div className="crumbs"><Link to="/shop">Shop</Link> / <span>{product.name}</span></div>

        <div className="product__grid">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <Crop src={product.image} crop={product.crop} ratio="4 / 5" className="product__img" alt={`${product.name} shirt`}>
              <span className="card__tag">{product.tag}</span>
            </Crop>
          </motion.div>

          <motion.div className="product__info" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="eyebrow">{product.collection}</div>
            <h1 className="serif">{product.name}</h1>
            <p className="product__price">{priceLabel(product)}</p>
            <p className="lede">{product.blurb}</p>

            <div className="field">
              <div className="field__label">
                <span>Size</span>
                <Link to="/custom">Need a custom fit?</Link>
              </div>
              <motion.div key={shake} className="sizes" animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
                {SIZES.map((s) => (
                  <button key={s} className={`size ${size === s ? 'is-on' : ''}`} onClick={() => setSize(s)} aria-pressed={size === s}>
                    {s}
                  </button>
                ))}
              </motion.div>
            </div>

            <div className="field">
              <div className="field__label"><span>Quantity</span></div>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less">−</button>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={qty} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.15 }}>
                    {qty}
                  </motion.span>
                </AnimatePresence>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="More">+</button>
              </div>
            </div>

            <div className="product__cta">
              <motion.button className="btn btn--block" onClick={onOrder} whileTap={{ scale: 0.98 }}>Order on Instagram DM</motion.button>
              <button className="btn btn--ghost btn--block" onClick={onCopy}>Copy order message</button>
            </div>

            <div className="accordion">
              {rows.map((r) => (
                <div key={r.id} className="accordion__row">
                  <button onClick={() => setOpenRow(openRow === r.id ? null : r.id)} aria-expanded={openRow === r.id}>
                    <span>{r.t}</span>
                    <motion.i animate={{ rotate: openRow === r.id ? 45 : 0 }}>+</motion.i>
                  </button>
                  <AnimatePresence initial={false}>
                    {openRow === r.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="accordion__body">
                        <p>{r.d}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section__head"><h2 className="serif">You may also like</h2></Reveal>
        <div className="grid grid--3">
          {more.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>
    </PageTransition>
  )
}
