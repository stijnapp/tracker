const timeFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' }

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

// TODO: jsdoc
export function dateToText(date = null) {
    return new Date(date ?? getCurrentDateTime()).toLocaleDateString()
}

export function timeToText(time = null, includeSeconds = false) {
    return new Date(time ?? getCurrentDateTime(includeSeconds)).toLocaleTimeString([], includeSeconds ? timeFormat : { hour: timeFormat.hour, minute: timeFormat.minute })
}

export function dateTimeToText(dateTime = null, includeSeconds = false) {
    return new Date(dateTime ?? getCurrentDateTime(includeSeconds)).toLocaleString([], includeSeconds ? { ...dateFormat, ...timeFormat } : { ...dateFormat, hour: timeFormat.hour, minute: timeFormat.minute })
}

export function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    switch (true) {
        case seconds < 60: // 60 seconds
            return 'just now'
        case seconds < 60 * 60: // 60 minutes
            return Math.floor(seconds / 60) + ' minutes ago'
        case seconds < 60 * 60 * 24: // 24 hours
            return Math.floor(seconds / 3600) + ' hours ago'
        case seconds < 60 * 60 * 24 * 31: // 31 days
            return Math.floor(seconds / 86400) + ' days ago'
        case seconds < 60 * 60 * 24 * 365: // 365 days
            return Math.floor(seconds / 2592000) + ' months ago'
        default:
            return Math.floor(seconds / 31536000) + ' years ago'
    }
}