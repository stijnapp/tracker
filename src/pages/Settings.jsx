import { faDesktop, faDownload, faMoon, faSun, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import HR from "../components/HR";
import Modal from "../components/Modal";
import Page from "../components/Page";
import Spinner from "../components/Spinner";
import { downloadObjectAsJson, importJsonFileToDatabase, promptFileSelection } from "../helpers/data";
import { dateToText, getCurrentDateTime, timeDifferenceToText } from "../helpers/dateTime";
import { db } from "../helpers/db";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";

/**
 * @param {{
 *  deferredPrompt: event,
 * }} args
 * @returns {JSX.Element}
 */
export default function Settings({ deferredPrompt }) {
    const [theme, setTheme] = useTheme()
    const [, setDbData] = useState(db.getAllData())

    const [showImportModal, setShowImportModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showTestDataModal, setShowTestDataModal] = useState(false)

    const [lastExportDate, setLastExportDate] = useLocalStorage('lastExportDate', getCurrentDateTime(true))
    const promoteExport = (new Date(getCurrentDateTime(true)) - new Date(lastExportDate)) / (1000 * 60 * 60 * 24) >= 7

    const isPWA = window.matchMedia('(display-mode: standalone)').matches

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: <>System <Badge className="ml-1">Default</Badge></>, icon: faDesktop },
    ]

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
        }
    }

    const handleExport = () => {
        downloadObjectAsJson(db.getAllData(), `trackerExport_${dateToText()}.json`)
        setLastExportDate(getCurrentDateTime(true))
    }

    const handleImport = () => {
        promptFileSelection((file) => {
            importJsonFileToDatabase(file, () => {
                setDbData(db.getAllData())
                setLastExportDate(getCurrentDateTime(true))
                setShowImportModal(false)
            })
        }, { accept: '.json' })
    }

    const handleDeleteAllData = () => {
        db.deleteAllData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
        setShowDeleteModal(false)
    }

    const handleSetTestData = () => {
        db.setTestData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
        setShowTestDataModal(false)
    }

    return (
        <>
            <Page title="Settings">
                <Card title="Appearance">
                    <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} hideLabel />
                </Card>

                {!isPWA && (
                    // TODO: dont show if deferredPrompt is null. Then animate in when it available
                    <Card title="Download">
                        <p className="mb-2">Download the app to use it offline</p>
                        <button className={`${deferredPrompt ? 'btn-primary' : 'btn-secondary'} w-full`} disabled={!deferredPrompt} onClick={handleInstall}>Install{!deferredPrompt && <Spinner className="ml-2" />}</button>
                    </Card>
                )}

                <Card title="Data">
                    <p className="mb-2">Export your data to keep it safe</p>
                    <div className="flex gap-4">
                        <button className={`${promoteExport ? 'btn-primary' : 'btn-secondary'} w-full`} onClick={handleExport}>Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                        <button className="btn-secondary w-full" onClick={() => setShowImportModal(true)}>Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
                    </div>
                    {db.hasData() && (
                        <p className="mt-2">Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                    )}
                    <Alert message={promoteExport ? 'It is adviced to export your data every 7 days' : null} isCloseable={false} className="mt-2" />

                    <HR className="-my-2" />

                    <p className="mb-2 font-semibold text-danger">Danger zone</p>
                    <button className="btn-danger w-full mb-4" disabled={db.hasData() ? false : true} onClick={() => setShowDeleteModal(true)}>Delete all data</button>
                    <button className="btn-danger w-full" onClick={() => setShowTestDataModal(true)}>Replace data with testdata</button>
                </Card>

                <Modal showModal={showImportModal} onClose={() => setShowImportModal(false)} title="Import data">
                    <p>Are you sure you want to import data? This will overwrite all your current data.</p>
                    <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                    <p className="text-danger">This action cannot be undone</p>
                    <div className="flex gap-4">
                        <button className="btn-secondary w-full" onClick={() => setShowImportModal(false)}>Cancel</button>
                        <button className="btn-danger w-full" onClick={handleImport}>Import data</button>
                    </div>
                </Modal>

                <Modal showModal={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete all data">
                    <p>Are you sure you want to delete all data?</p>
                    <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                    <p className="text-danger">This action cannot be undone</p>
                    <div className="flex gap-4">
                        <button className="btn-secondary w-full" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn-danger w-full" onClick={handleDeleteAllData}>Delete data</button>
                    </div>
                </Modal>

                <Modal showModal={showTestDataModal} onClose={() => setShowTestDataModal(false)}>
                    <p>Are you sure you want to replace all data with test data? This will overwrite all your current data.</p>
                    <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                    <p className="text-danger">This action cannot be undone</p>
                    <div className="flex gap-4">
                        <button className="btn-secondary w-full" onClick={() => setShowTestDataModal(false)}>Cancel</button>
                        <button className="btn-danger w-full" onClick={handleSetTestData}>Set test data</button>
                    </div>
                </Modal>
            </Page>
        </>
    )
}