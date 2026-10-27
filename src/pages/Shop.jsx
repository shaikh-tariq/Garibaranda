import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { collections, products } from '../data/products.js'

export default function Shop() {
  const [active, setActive] = useState('All')
  const shown = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.collection === active)),
    [active]
  )

  return (
    <PageTransition>
      <section className="wrap page-head">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
          <div className="eyebrow">Shop</div>
          <h1 className="serif">All the prints</h1>
          <p className="lede">Each shirt is hand-block printed. Tap a print to see its fabric, pick a size and order.</p>
        </motion.div>
      </section>

      <section className="wrap">
        <LayoutGroup>
          <div className="filters" role="tablist" aria-label="Filter prints">
            {collections.map((c) => (
              <button key={c} role="tab" aria-selected={active === c} className={`chip ${active === c ? 'is-on' : ''}`} onClick={() => setActive(c)}>
                {active === c && <motion.span layoutId="chip-bg" className="chip__bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="chip__label">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="grid">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <p className="count">{shown.length} {shown.length === 1 ? 'print' : 'prints'}</p>
      </section>
    </PageTransition>
  )
}
