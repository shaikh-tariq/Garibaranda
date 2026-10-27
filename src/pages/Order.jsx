import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Crop from '../components/Crop.jsx'
import { useToast } from '../components/Toast.jsx'
import { copyOnly, sendOrder } from '../components/order.js'
import { SIZES, products } from '../data/products.js'

const faqs = [
  { q: 'How do I pay?', a: 'We share payment details in the DM once your size and price are confirmed.' },
  { q: 'How long does it take?', a: 'Ready-made shirts ship sooner. Custom and made-to-order pieces take longer; we will tell you the exact time in the DM.' },
  { q: 'Can I change my size?', a: 'Yes, message us before we start printing and we will change it.' },
  { q: 'Do you ship across India?', a: 'Tell us your city in the message and we will confirm delivery.' },
]

export default function Order() {
  const toast = useToast()
  const [slug, setSlug] = useState(products[0].slug)
  const [size, setSize] = useState('40')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [note, setNote] = useState('')
  const [open, setOpen] = useState(0)

  const product = products.find((p) => p.slug === slug)

  const message = useMemo(
    () =>
      `Hi Garibaranda! I'd like to order the ${product.name} shirt, size ${size}.` +
      (name ? ` My name is ${name}.` : '') +
      (city ? ` Delivery city: ${city}.` : '') +
      (note ? ` Note: ${note}` : '') +
      ' Could you share the price and delivery details?',
    [product, size, name, city, note]
  )

  const onSend = async () => {
    const copied = await sendOrder(message)
    toast(copied ? 'Message copied. Paste it in the DM that just opened.' : 'Opening Instagram. Please type your order in the DM.')
  }
  const onCopy = async () => toast((await copyOnly(message)) ? 'Order message copied' : 'Could not copy')

  return (
    <PageTransition>
      <section className="wrap page-head">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
          <div className="eyebrow">How to order</div>
          <h1 className="serif">Build your order in a minute.</h1>
          <p className="lede">Choose a print and size. We write the message for you, you send it as a DM.</p>
        </motion.div>
      </section>

      <section className="wrap order">
        <Reveal className="order__form">
          <div className="field">
            <div className="field__label"><span>1 · Pick a print</span></div>
            <div className="picker">
              {products.map((p) => (
                <button key={p.slug} className={`picker__item ${slug === p.slug ? 'is-on' : ''}`} onClick={() => setSlug(p.slug)} aria-pressed={slug === p.slug}>
                  <Crop src={p.image} crop={p.crop} ratio="1 / 1" alt="" />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field__label"><span>2 · Size</span></div>
            <div className="sizes">
              {SIZES.map((s) => (
                <button key={s} className={`size ${size === s ? 'is-on' : ''}`} onClick={() => setSize(s)} aria-pressed={size === s}>{s}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field__label"><span>3 · Your details (optional)</span></div>
            <div className="row2">
              <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="Delivery city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <textarea rows="3" placeholder="Anything else? (a gift, a date you need it by…)" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order__preview">
          <div className="preview">
            <div className="preview__head">Your message</div>
            <motion.p key={message} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{message}</motion.p>
            <div className="preview__actions">
              <motion.button className="btn btn--block" onClick={onSend} whileTap={{ scale: 0.98 }}>Send on Instagram DM</motion.button>
              <button className="btn btn--ghost btn--block" onClick={onCopy}>Copy message</button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section wrap">
        <Reveal className="section__head"><h2 className="serif">Good to know</h2></Reveal>
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className="accordion__row">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <motion.i animate={{ rotate: open === i ? 45 : 0 }}>+</motion.i>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="accordion__body">
                <p>{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
