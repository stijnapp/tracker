import { useState } from 'react'

/**
 * Custom hook to manage state with localStorage.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {any} initialValue - The initial value to use if there is no value in localStorage.
 * @returns {[any, (value: any) => void]} - Returns the current value and a function to update it.
 */
export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
    })

    const setLocalStorageValue = (newValue) => {
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue
        setValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
    }

    return [value, setLocalStorageValue]
}