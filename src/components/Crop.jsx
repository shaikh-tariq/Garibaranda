// Shows one region of a photo (x, y = top-left, w = width, all as fractions of the image).
// The image is scaled up and shifted with transforms, so it works at any box shape.
export default function Crop({ src, crop, alt = '', className = '', ratio = '1 / 1', children }) {
  const { x, y, w } = crop
  return (
    <div className={`crop ${className}`} style={{ aspectRatio: ratio }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        style={{ width: `${100 / w}%`, transform: `translate(${-x * 100}%, ${-y * 100}%)` }}
      />
      {children}
    </div>
  )
}
