import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Crop from '../components/Crop.jsx'
import { products } from '../data/products.js'

// Placeholder copy: confirm the real process and wording with Nilanjana.
const process = [
  { n: '01', t: 'Carve', d: 'Each motif (a fish, a moth, an elephant) is carved into a block by hand.' },
  { n: '02', t: 'Mix', d: 'Azo-free dyes are mixed to the exact shade of the print.' },
  { n: '03', t: 'Press', d: 'The block is inked and pressed onto the fabric, one repeat at a time.' },
  { n: '04', t: 'Set & stitch', d: 'The print is set, then cut and stitched into a shirt made to be lived in.' },
]

const values = [
  { t: 'Azo-free', d: 'Kinder dyes for your skin and for the water they are rinsed in.' },
  { t: 'Rooted in Bengal', d: 'Motifs from the rivers, festivals and folk art around us.' },
  { t: 'Made to wear', d: 'Soft muslin and cotton, cut for comfort in every size up to XL.' },
]

export default function Craft() {
  return (
    <PageTransition>
      <section className="wrap page-head">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
          <div className="eyebrow">Our craft</div>
          <h1 className="serif">Made by hand, <em>one block</em> at a time.</h1>
          <p className="lede">Garibaranda crafts shirts and similars rooted in Bengal, redefining comfort with signature handblocks.</p>
        </motion.div>
      </section>

      <section className="wrap">
        <div className="gallery">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Crop src={p.image} crop={p.crop} ratio="3 / 4" alt={p.name} className="gallery__img" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section__head"><div><div className="eyebrow">The process</div><h2 className="serif">From block to shirt.</h2></div></Reveal>
        <div className="steps">
          {process.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="step">
              <b>{s.n}</b><h4 className="serif">{s.t}</h4><p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="values">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1} className="value">
              <h3 className="serif">{v.t}</h3>
              <p>{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta">
          <h2 className="serif">Ready to wear the story?</h2>
          <p>Choose a print and send us a message. We will take it from there.</p>
          <Link to="/shop" className="btn btn--light">Browse the prints</Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
