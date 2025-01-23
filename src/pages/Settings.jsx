import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Badge from "../components/Badge";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Page from "../components/Page";
import useTheme from "../hooks/useTheme";

export default function Settings() {
    const [theme, setTheme] = useTheme()
    // // TODO: implement export and import data
    // const [promoteExport, setPromoteExport] = useState(true)

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: <>System <Badge className="ml-1">Default</Badge></>, icon: faDesktop },
    ]

    return (
        <Page title="Settings">
            <Card title="Appearance">
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} hideLabel />
            </Card>
            {/* <Card title="Data" className="flex gap-4">
                <button className={`${promoteExport ? 'btn-primary' : 'btn-secondary'} w-full`} onClick={() => setPromoteExport(false)}>Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                <button className="btn-secondary w-full">Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
            </Card> */}
        </Page>
    )
}