import { dateToText } from "./dateTime"
import { db } from "./db"

export function exportDatabaseToJsonFile() {
    const dataStr = JSON.stringify(db.getAllData(), null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const htmlLink = document.createElement('a')
    htmlLink.href = url
    htmlLink.download = `trackerExport_${dateToText()}.json`
    htmlLink.click()
    URL.revokeObjectURL(url)
}

export function openDataFile(callback) {
    const htmlInput = document.createElement('input')
    // TODO: 'options' object as argument, and add all the attributes to the input element
    htmlInput.type = 'file'
    htmlInput.accept = '.json'
    htmlInput.multiple = false // TODO: is this needed?
    htmlInput.click()
    // TODO: what would async add?
    htmlInput.onchange = /* async */ (e) => {
        const file = e.target.files[0]
        if (!file) return
        callback(file)
    }
}

export function importJsonFileToDatabase(file, callback) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        if (!checkIfValidData(data)) {
            // TODO: show global error message (same for other console.errors)
            console.error('Invalid data')
            return
        }
        console.log('Imported data:', data)
        db.setAllData(data)
        callback()
    }
}

export function checkIfValidData(data) {
    // TODO: implement this
    return true
}