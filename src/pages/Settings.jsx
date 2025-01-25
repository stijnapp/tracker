import { faDesktop, faDownload, faMoon, faSun, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import HR from "../components/HR";
import Page from "../components/Page";
import { dateToText, getCurrentDateTime, timeAgo } from "../helpers/dateTime";
import { db } from "../helpers/db";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";

export default function Settings() {
    const [theme, setTheme] = useTheme()
    const [dbData, setDbData] = useState(db.getAllData())
    const [lastExportDate, setLastExportDate] = useLocalStorage('lastExportDate', getCurrentDateTime(true))

    const promoteExport = (new Date() - new Date(lastExportDate)) / (1000 * 60 * 60 * 24) > 7

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: <>System <Badge className="ml-1">Default</Badge></>, icon: faDesktop },
    ]

    const handleExport = () => {
        const dataStr = JSON.stringify(dbData, null, 2)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = `trackerExport_${dateToText()}.json`
        downloadLink.click()
        URL.revokeObjectURL(url)

        setLastExportDate(getCurrentDateTime(true))
    }

    const handleImport = () => {
        // TODO: export data
        // TODO: confirmation modal (it will overwrite all data)
        console.log('Importing data...')
        setLastExportDate(getCurrentDateTime(true))
    }

    const handleDeleteAllData = () => {
        // TODO: confirmation modal
        console.log('Deleting all data...')
        db.deleteAllData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
    }

    const handleSetTestData = () => {
        // TODO: confirmation modal
        console.log('Setting test data...')
        db.setTestData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
    }

    return (
        <Page title="Settings">
            <Card title="Appearance">
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} hideLabel />
            </Card>

            <Card title="Data">
                <Alert message={promoteExport ? 'It has been more than 7 days ago since you last exported your data' : null} isCloseable={false} className="mb-4" />
                <div className="flex gap-4">
                    <button className={`${promoteExport ? 'btn-primary' : 'btn-secondary'} w-full`} onClick={handleExport}>Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                    <button className="btn-secondary w-full" onClick={handleImport}>Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
                </div>
                <p className="mt-2">Last export was <strong>{timeAgo(lastExportDate)}</strong></p>

                <HR className="-mb-2" />

                <p className="mb-2 font-semibold text-danger">Danger zone</p>
                {/* TODO: confirmation modal. Has to type something before able to confirm */}
                <button className="btn-danger w-full mb-4" disabled={db.hasData() ? false : true} onClick={handleDeleteAllData}>Delete all data</button>
                <button className="btn-danger w-full" onClick={handleSetTestData}>Replace data with testdata</button>
            </Card>
        </Page>
    )
}