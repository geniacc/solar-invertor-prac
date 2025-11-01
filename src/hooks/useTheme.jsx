import { createContext, useContext, useEffect, useState } from 'react'

const ThemeProviderContext = createContext({
  theme: 'system',
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}) {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey)) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    // Remove existing classes and apply the selected theme to both class and data-theme
    root.classList.remove('light', 'dark')

    let appliedTheme = theme
    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    root.classList.add(appliedTheme)
    root.setAttribute('data-theme', appliedTheme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}