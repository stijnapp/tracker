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
        <Page title="Settings">
            <Card>
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} />
            </Card>
        </Page>
    )
}