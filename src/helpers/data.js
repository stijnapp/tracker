import { db } from "./db"

/**
 * Downloads an object as a JSON file
 * 
 * @param {Object} object - The object to download
 * @param {string} filename - The name of the downloaded file
 * @returns {void}
 */
export function downloadObjectAsJson(object, filename) {
    const dataStr = JSON.stringify(object, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const htmlLink = document.createElement('a')
    htmlLink.href = url
    htmlLink.download = filename
    htmlLink.click()
    URL.revokeObjectURL(url)
}

/**
 * Prompts the user to select a file
 * 
 * @param {(file: File) => {}} callback - Gets called with the selected file
 * @param {Object} options - Options for the file input element
 * @returns {void}
 */
export function promptFileSelection(callback, options = {}) {
    const htmlInput = document.createElement('input')
    htmlInput.type = 'file'
    for (const key in options) {
        htmlInput[key] = options[key]
    }
    htmlInput.click()
    htmlInput.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            htmlInput.remove()
            return
        }
        callback(file)
        htmlInput.remove()
    }
}

/**
 * Imports a JSON file to the database
 * 
 * @param {File} file - The file to import
 * @param {() => void} callback - Gets called after the data is imported
 * @returns {void}
 */
export function importJsonFileToDatabase(file, callback) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        if (!isValidDataFormat(data)) {
            // TODO: show global error message (same for other console.errors)
            console.error('Invalid data')
            return
        }
        console.log('Imported data:', data)
        db.setAllData(data)
        callback()
    }
}

/**
 * @param {Object} data - Object to check against the database schema
 * @returns {boolean}
 */
export function isValidDataFormat(data) {
    // TODO: implement this
    return true
}