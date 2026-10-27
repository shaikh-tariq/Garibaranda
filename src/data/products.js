// Concept data. Prices, fabrics, sizes and print names are PLACEHOLDERS —
// replace with the real details from Nilanjana. Set `price` to a number (₹) to show it.
//
// crop = which part of the photo to show, as fractions of the image:
//   x / y = top-left corner, w = width of the visible region.
// The photos are customer shots, so every crop starts below the face.

export const SIZES = ['38', '40', '42', '44', 'XL']

export const INSTAGRAM_HANDLE = 'garibaranda'
export const DM_LINK = `https://ig.me/m/${INSTAGRAM_HANDLE}`

export const products = [
  {
    slug: 'yellow-moth',
    name: 'Yellow Moth',
    tag: 'Short sleeve',
    collection: 'Festive',
    image: '/img/moth.png',
    crop: { x: 0.34, y: 0.34, w: 0.45 },
    swatch: '#E3B23C',
    print: 'Hand-block, ochre on cream',
    fabric: 'Cotton muslin',
    price: null,
    blurb:
      'Wide-winged moths in ochre and blue-grey, pressed one block at a time on a soft cream ground. Light, airy and made for long festive evenings.',
  },
  {
    slug: 'fish-and-waves',
    name: 'Fish & Waves',
    tag: 'Pujo 2026',
    collection: 'Pujo 2026',
    image: '/img/fish.png',
    crop: { x: 0.27, y: 0.35, w: 0.45 },
    swatch: '#C9A227',
    print: 'Hand-block border, black on mustard',
    fabric: 'Cotton muslin',
    price: null,
    blurb:
      'A river of block-printed fish swimming along the hem, over rows of waves. The Bengal motif everyone recognises, worn quietly.',
  },
  {
    slug: 'forest-floral',
    name: 'Forest Floral',
    tag: 'Festive',
    collection: 'Festive',
    image: '/img/floral.png',
    crop: { x: 0.235, y: 0.3, w: 0.45 },
    swatch: '#6E8B5B',
    print: 'Hand-block, sage on black',
    fabric: 'Cotton',
    price: null,
    blurb:
      'Layered sage blooms and leaves on a deep black ground. Dressy enough for an evening out, easy enough for every day.',
  },
  {
    slug: 'red-elephant',
    name: 'Red Elephant',
    tag: 'Playful',
    collection: 'Playful',
    image: '/img/elephant.png',
    crop: { x: 0.32, y: 0.31, w: 0.4 },
    swatch: '#C8362E',
    print: 'Hand-block, red on cream',
    fabric: 'Cotton',
    price: null,
    blurb:
      'A parade of little red elephants on cream. Joyful, a bit cheeky, and a conversation starter at every party.',
  },
]

export const collections = ['All', ...Array.from(new Set(products.map((p) => p.collection)))]

export const bySlug = (slug) => products.find((p) => p.slug === slug)

export const priceLabel = (p) => (p.price ? `₹ ${p.price.toLocaleString('en-IN')}` : 'Price on request')
