import { faDesktop, faDownload, faMoon, faSun, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import HR from "../components/HR";
import Page from "../components/Page";
import useTheme from "../hooks/useTheme";

export default function Settings() {
    const [theme, setTheme] = useTheme()
    // TODO: implement export and import data
    const [promoteExport, setPromoteExport] = useState(true)

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: <>System <Badge className="ml-1">Default</Badge></>, icon: faDesktop },
    ]

    const handleExport = () => {
        console.log('Exporting data...')
        setPromoteExport(false)
    }

    const handleImport = () => {
        console.log('Importing data...')
        setPromoteExport(true)
    }

    return (
        <Page title="Settings">
            <Card title="Appearance">
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} hideLabel />
            </Card>
            <Card title="Data">
                <Alert message={promoteExport ? 'It has been more than 7 days ago since you last exported your data' : null} setMessage={setPromoteExport} type="warning" isCloseable={false} className="mb-4" />
                <div className="flex gap-4">
                    <button className={`${promoteExport ? 'btn-primary' : 'btn-secondary'} w-full`} onClick={handleExport}>Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                    <button className="btn-secondary w-full" onClick={handleImport}>Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
                </div>
                <HR className="mt-8" />
                <p className="mb-2 font-semibold text-danger">Danger zone</p>
                {/* TODO: confirmation modal. Has to type something before able to confirm */}
                <button className="btn-danger w-full mb-4" disabled>Delete all data</button>
                <button className="btn-danger w-full" disabled>Replace data with testdata</button>
            </Card>
        </Page>
    )
}