# Garibaranda — catalogue site concept

Vite + React + React Router + Framer Motion.

## Run it
```
npm install     (first time only)
npm run dev
```
Then open the address it prints (usually http://localhost:5173).

## Pages
| Route | What it is |
|---|---|
| `/` | Home: hero, featured prints, craft teaser, how to order, custom CTA |
| `/shop` | All prints with animated filters |
| `/shop/:slug` | Print page: size, quantity, order on DM, details accordion |
| `/craft` | The story and process |
| `/custom` | Custom-made request builder (measurements, print, colour) |
| `/order` | Order builder + FAQ |

"Order" never needs a cart: it writes the message, copies it, and opens
https://ig.me/m/garibaranda so the customer can paste it as a DM.

## Where to edit
- `src/data/products.js` — prints, fabric, sizes, prices, Instagram handle. **All fabric, size, price and print-name values are placeholders.**
- `src/styles.css` — colours are the variables at the top.
- `public/img/` — the photos. They are customer photos from the brand's posts, cropped to the shirt; swap in the brand's own product shots and adjust each `crop` in `products.js`.
- `src/pages/Craft.jsx` — process copy is placeholder; confirm with the brand.
