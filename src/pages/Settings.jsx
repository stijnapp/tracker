import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Badge from "../components/Badge";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Page from "../components/Page";
import useTheme from "../hooks/useTheme";

export default function Settings() {
    const [theme, setTheme] = useTheme()

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: <>System <Badge className="ml-1">Default</Badge></>, icon: faDesktop },
    ]

    return (
        <Page title="Settings" className="flex flex-col gap-4">
            <Card>
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} />
            </Card>
            {/* <Card title="Data" className="flex gap-4">
                TODO: make export primary if last export was more than 7 days ago
                <button className="btn-secondary w-full">Export Data<FontAwesomeIcon icon={faUpload} className="ml-2" /></button>
                <button className="btn-secondary w-full">Import Data<FontAwesomeIcon icon={faDownload} className="ml-2" /></button>
            </Card> */}
        </Page>
    )
}