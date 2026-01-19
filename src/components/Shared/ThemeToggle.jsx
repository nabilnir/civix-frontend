import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    )

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')

        // Set the theme attribute on the html element
        document.documentElement.setAttribute('data-theme', localTheme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Theme"
        >
            <div className="indicator">
                {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-current" />
                ) : (
                    <Sun className="w-5 h-5 text-current" />
                )}
            </div>
        </button>
    )
}

export default ThemeToggle
