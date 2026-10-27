import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import { useToast } from '../components/Toast.jsx'
import { copyOnly, sendOrder } from '../components/order.js'
import { products } from '../data/products.js'

const types = ['Shirt', 'Tee', 'Something else']
const perks = [
  { t: 'Your size', d: 'Made to your measurements, including sizes beyond XL.' },
  { t: 'Your print', d: 'Choose one of our blocks, or tell us a motif you love.' },
  { t: 'Your colour', d: 'Pick a fabric colour that suits you or the occasion.' },
]

export default function Custom() {
  const toast = useToast()
  const [type, setType] = useState('Shirt')
  const [print, setPrint] = useState(products[0].name)
  const [chest, setChest] = useState('')
  const [length, setLength] = useState('')
  const [colour, setColour] = useState('')
  const [note, setNote] = useState('')

  const message = useMemo(
    () =>
      `Hi Garibaranda! I'd like a custom-made ${type.toLowerCase()} in the ${print} print.` +
      (chest ? ` Chest: ${chest} in.` : '') +
      (length ? ` Length: ${length} in.` : '') +
      (colour ? ` Preferred colour: ${colour}.` : '') +
      (note ? ` Note: ${note}` : '') +
      ' Could you share the price and how long it takes?',
    [type, print, chest, length, colour, note]
  )

  const onSend = async () => {
    const copied = await sendOrder(message)
    toast(copied ? 'Message copied. Paste it in the DM that just opened.' : 'Opening Instagram. Please type your request in the DM.')
  }
  const onCopy = async () => toast((await copyOnly(message)) ? 'Message copied' : 'Could not copy')

  return (
    <PageTransition>
      <section className="wrap page-head">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
          <div className="eyebrow">Custom made</div>
          <h1 className="serif">Made <em>just</em> for you.</h1>
          <p className="lede">Tell us what you have in mind. We write the request, you send it as a DM, and we reply with a price and timeline.</p>
        </motion.div>
      </section>

      <section className="wrap">
        <div className="perks">
          {perks.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08} className="perk"><h3 className="serif">{p.t}</h3><p>{p.d}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap order">
        <Reveal className="order__form">
          <div className="field">
            <div className="field__label"><span>What are we making?</span></div>
            <div className="sizes">
              {types.map((t) => (
                <button key={t} className={`size size--wide ${type === t ? 'is-on' : ''}`} onClick={() => setType(t)} aria-pressed={type === t}>{t}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field__label"><span>Print</span></div>
            <select value={print} onChange={(e) => setPrint(e.target.value)}>
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
              <option>A new print I describe below</option>
            </select>
          </div>

          <div className="field">
            <div className="field__label"><span>Measurements (inches)</span></div>
            <div className="row2">
              <input inputMode="decimal" placeholder="Chest" value={chest} onChange={(e) => setChest(e.target.value)} />
              <input inputMode="decimal" placeholder="Length" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <div className="field__label"><span>Colour &amp; notes</span></div>
            <input placeholder="Preferred fabric colour" value={colour} onChange={(e) => setColour(e.target.value)} />
            <textarea rows="3" placeholder="Anything else? (an occasion, a date, a motif…)" value={note} onChange={(e) => setNote(e.target.value)} />
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
    </PageTransition>
  )
}
