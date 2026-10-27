import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Crop from '../components/Crop.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const marquee = ['Hand-block printed', 'Azo-free dyes', 'Rooted in Bengal', 'Custom made', 'Muslin shirts', 'Pujo 2026']

const steps = [
  { n: '01', t: 'Pick a print', d: 'Browse every design with its fabric and sizes in one place.' },
  { n: '02', t: 'Choose your size', d: 'Sizes 38 to XL, or ask for a custom-made fit.' },
  { n: '03', t: 'Order directly', d: 'One tap opens a DM with your shirt and size already written.' },
  { n: '04', t: 'We make it, you wear it', d: 'Printed by hand, packed with care and sent to your door.' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroFish = products.find((p) => p.slug === 'fish-and-waves')

  return (
    <PageTransition>
      <section className="hero wrap" ref={heroRef}>
        <motion.div className="hero__text" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="eyebrow">Hand-block printed · Rooted in Bengal</motion.div>
          <motion.h1 variants={rise} className="serif">
            Shirts with a <em>story</em> in every print.
          </motion.h1>
          <motion.p variants={rise} className="lede">
            Every Garibaranda shirt is block-printed by hand with signature Bengal motifs: fish, moths, elephants, forests.
            Pick a print, pick your size, and order directly.
          </motion.p>
          <motion.div variants={rise} className="hero__cta">
            <Link to="/shop" className="btn">Browse all prints</Link>
            <Link to="/custom" className="btn btn--ghost">Ask for custom made</Link>
          </motion.div>
          <motion.ul variants={rise} className="badges">
            <li>Azo-free dyes</li>
            <li>Hand-block printed</li>
            <li>Sizes up to XL</li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero__art"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <motion.div style={{ y: imgY }}>
            <Crop
              src={heroFish.image}
              crop={{ x: 0.225, y: 0.33, w: 0.55 }}
              ratio="6 / 7"
              className="hero__img"
              alt="Fish and Waves shirt"
            />
          </motion.div>
          <motion.div
            className="hero__chip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="dot" style={{ background: heroFish.swatch }} />
            <div>
              <strong>{heroFish.name}</strong>
              <small>{heroFish.tag}</small>
            </div>
            <Link to={`/shop/${heroFish.slug}`} aria-label="View Fish and Waves">→</Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i}>{m}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section className="section wrap">
        <Reveal className="section__head">
          <div>
            <div className="eyebrow">The prints</div>
            <h2 className="serif">Pick the one that feels like you.</h2>
          </div>
          <Link to="/shop" className="link-arrow">See all prints →</Link>
        </Reveal>
        <div className="grid">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="story">
          <div className="story__text">
            <div className="eyebrow eyebrow--light">Our craft</div>
            <h2 className="serif">Made by hand, one block at a time.</h2>
            <p>
              Every motif is carved into a block, inked with azo-free dyes and pressed onto the fabric by hand, which is why no two shirts
              are exactly alike.
            </p>
            <Link to="/craft" className="btn btn--light">Read the story</Link>
          </div>
          <div className="story__pics">
            {products.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-4, 3, -2][i] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 3 }}
                className="story__pic"
              >
                <Crop src={p.image} crop={p.crop} ratio="4 / 5" alt={p.name} />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section wrap">
        <Reveal className="section__head">
          <div>
            <div className="eyebrow">How to order</div>
            <h2 className="serif">No cart, no fuss. Just a message.</h2>
          </div>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="step">
              <b>{s.n}</b>
              <h4 className="serif">{s.t}</h4>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta">
          <h2 className="serif">Want something only you will own?</h2>
          <p>Tell us your size, your colour and the motif you love. We will make it just for you.</p>
          <Link to="/custom" className="btn btn--light">Start a custom order</Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
