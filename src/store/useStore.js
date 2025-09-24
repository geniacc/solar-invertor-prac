import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
      openCart: () => set({ isOpen: true }),
      
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)

// User Store
export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => {
        set({ user: userData, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      }
    }),
    {
      name: 'user-storage'
    }
  )
)

// UI Store
export const useUIStore = create((set, get) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isLoading: false,
  
  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
  closeSearch: () => set({ isSearchOpen: false }),
  
  setLoading: (loading) => set({ isLoading: loading })
}))

// Products Store
export const useProductsStore = create((set, get) => ({
  products: [],
  categories: [],
  filters: {
    category: '',
    priceRange: [0, 10000],
    rating: 0,
    inStock: false
  },
  sortBy: 'name',
  searchQuery: '',
  
  setProducts: (products) => set({ products }),
  
  setCategories: (categories) => set({ categories }),
  
  updateFilters: (newFilters) => set({ 
    filters: { ...get().filters, ...newFilters } 
  }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredProducts: () => {
    const { products, filters, sortBy, searchQuery } = get()
    let filtered = [...products]
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }
    
    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )
    
    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating)
    }
    
    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return a.name.localeCompare(b.name)
      }
    })
    
    return filtered
  }
}))