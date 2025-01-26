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
    return currentDateTime.toJSON().substring(0, includeSeconds ? 19 : 16)
}

/**
 * @param {string} [date=null]
 * @returns {string}
 * @example
 * dateToText() // '2-22-2022'
 * dateToText('2022-02-22T14:00') // '2-22-2022'
 */
export function dateToText(date = null) {
    return new Date(date ?? getCurrentDateTime()).toLocaleDateString()
}

/**
 * @param {string} [time=null]
 * @param {boolean} [includeSeconds=false]
 * @returns {string}
 * @example
 * timeToText() // '15:00'
 * timeToText('2022-02-22T15:00') // '15:00'
 * timeToText('2022-02-22T15:00', true) // '15:00:00'
 */
export function timeToText(time = null, includeSeconds = false) {
    return new Date(time ?? getCurrentDateTime(includeSeconds)).toLocaleTimeString([], includeSeconds ? timeFormat : { hour: timeFormat.hour, minute: timeFormat.minute })
}

/**
 * @param {string} [dateTime=null]
 * @param {boolean} [includeSeconds=false]
 * @returns {string}
 * @example
 * dateTimeToText() // '2-22-2022, 15:00'
 * dateTimeToText('2022-02-22T15:00') // '2-22-2022, 15:00'
 * dateTimeToText('2022-02-22T15:00', true) // '2-22-2022, 15:00:00'
 */
export function dateTimeToText(dateTime = null, includeSeconds = false) {
    return new Date(dateTime ?? getCurrentDateTime(includeSeconds)).toLocaleString([], includeSeconds ? { ...dateFormat, ...timeFormat } : { ...dateFormat, hour: timeFormat.hour, minute: timeFormat.minute })
}

/**
 * @param {string} date
 * @returns {string}
 * @example
 * timeDifferenceToText('2022-02-22T15:00:00') // 'just now'
 * timeDifferenceToText('2022-02-22T14:00:00') // '1 hour ago'
 * timeDifferenceToText('2022-02-24T15:00:00') // '2 days from now'
 */
export function timeDifferenceToText(date) {
    const now = getCurrentDateTime(true)
    const parsedDate = new Date(date)
    const seconds = Math.floor((now - parsedDate) / 1000)

    if (isNaN(seconds)) {
        console.error('Invalid date:', date)
        return 'Invalid date'
    }

    const intervals = [
        { label: 'year', timeLimit: 60 * 60 * 24 * 365 },
        { label: 'month', timeLimit: 60 * 60 * 24 * 30 },
        { label: 'week', timeLimit: 60 * 60 * 24 * 7 },
        { label: 'day', timeLimit: 60 * 60 * 24 },
        { label: 'hour', timeLimit: 60 * 60 },
        { label: 'minute', timeLimit: 60 },
    ]

    const isInPast = seconds > 0
    const positiveSeconds = Math.abs(seconds)

    for (const { label, timeLimit } of intervals) {
        if (positiveSeconds >= timeLimit) {
            const value = Math.floor(positiveSeconds / timeLimit)
            return `${value} ${label}${value > 1 ? 's' : ''} ${isInPast ? 'ago' : 'from now'}`
        }
    }

    return 'just now'
}