import { useEffect, useState } from 'react'

// Fetches product dataset from the desktop app dev server as a source of truth
// Falls back to an empty list if not available
export default function useProductsData() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // Prefer the desktop app's dataset if its dev server is running
        const res = await fetch('http://localhost:5174/data/pdf-products.json', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch products JSON')
        const json = await res.json()
        // Normalize a bit for card usage
        const normalized = (json?.products || json || []).map((p, idx) => ({
          id: p.id ?? idx,
          name: p.name ?? p.title ?? 'Product',
          description: p.description ?? p.desc ?? '',
          image: p.image ?? p.img ?? '/vite.svg',
          specs: p.specs ?? p.details ?? {},
          price: p.price ?? p.mrp ?? null,
        }))
        if (!cancelled) setProducts(normalized)
      } catch (e) {
        console.warn('Products fetch failed, using fallback:', e?.message || e)
        if (!cancelled) setProducts([])
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { products, loading, error }
}