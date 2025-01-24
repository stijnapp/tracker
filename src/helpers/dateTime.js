export function getCurrentDateTime() {
    const currentDateTime = new Date()
    currentDateTime.setHours(currentDateTime.getHours() + 1)
    return currentDateTime.toJSON().substring(0, 16)
}