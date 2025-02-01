/**
 * @param {string} durationString
 * @returns {number}
 */
export function getMsFromDuration(durationString) {
    const durationRegex = /duration-\[(\d+)(ms|s|m)\]/
    const [match, duration, durationUnit] = durationString.match(durationRegex)

    if (!match) {
        console.error('Invalid duration format:', durationString)
        return 0
    }

    switch (durationUnit) {
        case 'ms':
            return parseInt(duration)
        case 's':
            return parseInt(duration) * 1000
        case 'm':
            return parseInt(duration) * 1000 * 60
        default:
            console.error('Invalid duration unit:', durationUnit)
            return 0
    }
}

export function sanitizeString(string, toLowerCase = false) {
    if (!string) return ''
    const sanitized = string.trim().replace(/\s{2,}/g, ' ')
    return toLowerCase ? sanitized.toLowerCase() : sanitized
}