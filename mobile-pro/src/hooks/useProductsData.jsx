import { useEffect, useState } from 'react'
import { PRODUCTS_URL } from '../config'

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
        const res = await fetch(PRODUCTS_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch products JSON')
        const json = await res.json()
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