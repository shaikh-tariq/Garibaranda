import { DM_LINK } from '../data/products.js'

// Copies the order message, then opens the Instagram DM. Returns true if the clipboard worked.
export async function sendOrder(message) {
  let copied = false
  try {
    await navigator.clipboard.writeText(message)
    copied = true
  } catch {
    copied = false
  }
  window.open(DM_LINK, '_blank', 'noopener')
  return copied
}

export async function copyOnly(message) {
  try {
    await navigator.clipboard.writeText(message)
    return true
  } catch {
    return false
  }
}
