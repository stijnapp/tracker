import useLocalStorage from './useLocalStorage'

/**
 * Custom hook to manage the theme with localStorage.
 * 
 * @returns {[
 *  ('light'|'dark'|'system'),
 *  (value: ('light'|'dark'|'system')) => void
 * ]} - An array containing the current theme and a function to update the theme.
 */
export default function useTheme() {
    const [theme, setTheme] = useLocalStorage('theme', 'system')
    const allowedThemes = ['light', 'dark', 'system']

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkTheme = theme === 'dark' || (theme === 'system' && prefersDark)

    document.documentElement.classList.toggle('dark', isDarkTheme)
    document.querySelector('meta[name="theme-color"]').setAttribute('content', isDarkTheme ? '#16181b' : '#f3f4f6')

    const updateTheme = (value) => {
        if (!allowedThemes.includes(value)) {
            console.error(`Invalid theme value: ${value}. Allowed values are: ${allowedThemes.join(', ')}`)
            return
        }
        setTheme(value)
    }

    return [theme, updateTheme]
}