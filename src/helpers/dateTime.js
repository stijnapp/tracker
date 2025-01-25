/**
 * @param {boolean} [includeSeconds=false]
 * @returns {string}
 * @example
 * getCurrentDateTime() // '2022-02-22T14:00'
 * getCurrentDateTime(true) // '2022-02-22T14:00:00'
 */
export function getCurrentDateTime(includeSeconds = false) {
    const currentDateTime = new Date()
    currentDateTime.setHours(currentDateTime.getHours() + 1)
    if (includeSeconds) {
        return currentDateTime.toJSON().substring(0, 19)
    }
    return currentDateTime.toJSON().substring(0, 16)
}