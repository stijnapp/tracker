import { faDesktop, faDownload, faMoon, faSun, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Card from '../components/Card'
import FancyRadioButtonGroup from '../components/Form/FancyRadioButtonGroup'
import Input from '../components/Form/Input'
import HR from '../components/HR'
import Modal from '../components/Modal'
import Page from '../components/Page'
import Spinner from '../components/Spinner'
import { downloadObjectAsJson, importJsonFileToDatabase, promptFileSelection } from '../helpers/data'
import { dateToText, getCurrentDateTime, timeDifferenceToText } from '../helpers/dateTime'
import { db } from '../helpers/db'
import useLocalStorage from '../hooks/useLocalStorage'
import useTheme from '../hooks/useTheme'
import { Link } from 'react-router-dom'

/**
 * @param {{
 *  deferredPrompt: event,
 * }} props
 * @returns {JSX.Element}
 */
export default function Settings({ deferredPrompt }) {
    const [theme, setTheme] = useTheme()
    const [, setDbData] = useState(db.getAllData())
    const dbHasData = db.hasData()

    const [showImportModal, setShowImportModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showTestDataModal, setShowTestDataModal] = useState(false)
    const [confirmInput, setConfirmInput] = useState('')
    const confirmText = 'test' /* 'I will lose my current data' */
    const hasCorrectConfirmText = confirmInput.toLowerCase() === confirmText.toLowerCase() || !dbHasData

    const [lastExportDate, setLastExportDate] = useLocalStorage('lastExportDate', getCurrentDateTime(true))
    const promoteExport = (new Date(getCurrentDateTime(true)) - new Date(lastExportDate)) / (1000 * 60 * 60 * 24) >= 7

    const isPWA = window.matchMedia('(display-mode: standalone)').matches

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: 'System', icon: faDesktop },
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
        if (!hasCorrectConfirmText) return
        promptFileSelection((file) => {
            importJsonFileToDatabase(file, () => {
                setDbData(db.getAllData())
                setLastExportDate(getCurrentDateTime(true))
                closeModals()
            })
        }, { accept: '.json' })
    }

    const handleDeleteAllData = () => {
        if (!hasCorrectConfirmText) return
        db.deleteAllData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
        closeModals()
    }

    const handleSetTestData = () => {
        if (!hasCorrectConfirmText) return
        db.setTestData()
        setLastExportDate(getCurrentDateTime(true))
        setDbData(db.getAllData())
        closeModals()
    }

    const closeModals = () => {
        setShowImportModal(false)
        setShowDeleteModal(false)
        setShowTestDataModal(false)
        setConfirmInput('')
    }

    return (
        <>
            <Page title="Settings">
                <Card title="Appearance">
                    <FancyRadioButtonGroup label="Theme" options={themeOptions} value={theme} onChange={(e) => setTheme(e.target.value)} valueWithDefaultBadge="system" hideLabel />
                </Card>

                {!isPWA && (
                    <Card title="Download">
                        <p className="mb-2">Download the app to use it offline</p>
                        <button className={`${deferredPrompt ? 'btn-primary' : 'btn-secondary'} w-full`} disabled={!deferredPrompt} onClick={handleInstall}>Install{!deferredPrompt && <Spinner className="ml-2" />}</button>
                        {!deferredPrompt && <p className="mt-1 subtext">You may have already downloaded the app</p>}
                    </Card>
                )}

                <Card title="Data">
                    <p className="mb-2">Export your data to keep it safe</p>
                    <div className="flex gap-4">
                        <button className={`${promoteExport ? 'btn-primary' : 'btn-secondary'} w-full`} onClick={handleExport}>Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                        <button className="btn-secondary w-full" onClick={() => setShowImportModal(true)}>Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
                    </div>
                    {dbHasData && <p className="mt-2">Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>}

                    <HR className='-my-1' />

                    <h1 className='font-semibold mb-1'>Export to <a href='https://www.strong.app/' className='link'>Strong app</a></h1>
                    <Link to="/settings/strong-export" className="btn-primary block text-center">View data to export to Strong</Link>

                    <HR className='-mb-1' />

                    <p className="mb-2 font-semibold text-danger">Danger zone</p>
                    <button className="btn-danger w-full mb-4" disabled={dbHasData ? false : true} onClick={() => setShowDeleteModal(true)}>Delete all data</button>
                    <button className="btn-danger w-full" onClick={() => setShowTestDataModal(true)}>Replace data with testdata</button>
                </Card>

                <Modal showModal={showImportModal} onClose={closeModals} title="Import data">
                    <p>Are you sure you want to import data? This will overwrite all your current data.</p>
                    {dbHasData && <>
                        <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                        <p>Type &quot;<strong>{confirmText}</strong>&quot; to confirm</p>
                        <Input label="Confirm" type="text" value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} />
                    </>}
                    <p className="font-semibold text-danger">This action cannot be undone</p>
                    <button className="btn-danger w-full" disabled={!hasCorrectConfirmText} onClick={handleImport}>Import data</button>
                    <button className="btn-secondary w-full" onClick={closeModals}>Cancel</button>
                </Modal>

                <Modal showModal={showDeleteModal} onClose={closeModals} title="Delete all data">
                    <p>Are you sure you want to delete all data?</p>
                    {dbHasData && <>
                        <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                        <p>Type &quot;<strong>{confirmText}</strong>&quot; to confirm</p>
                        <Input label="Confirm" type="text" value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} />
                    </>}
                    <p className="font-semibold text-danger">This action cannot be undone</p>
                    <button className="btn-danger w-full" disabled={!hasCorrectConfirmText} onClick={handleDeleteAllData}>Delete data</button>
                    <button className="btn-secondary w-full" onClick={closeModals}>Cancel</button>
                </Modal>

                <Modal showModal={showTestDataModal} onClose={closeModals} title="Replace data with test data">
                    <p>Are you sure you want to replace all data with test data? This will overwrite all your current data.</p>
                    {dbHasData && <>
                        <p>Your last export was <strong>{timeDifferenceToText(lastExportDate)}</strong></p>
                        <p>Type &quot;<strong>{confirmText}</strong>&quot; to confirm</p>
                        <Input label="Confirm" type="text" value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} />
                    </>}
                    <p className="font-semibold text-danger">This action cannot be undone</p>
                    <button className="btn-danger w-full" disabled={!hasCorrectConfirmText} onClick={handleSetTestData}>Set test data</button>
                    <button className="btn-secondary w-full" onClick={closeModals}>Cancel</button>
                </Modal>
            </Page>
        </>
    )
}