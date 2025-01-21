import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Page from "../components/Page";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'system')

    const themeOptions = [
        { value: 'light', label: 'Light', icon: faSun },
        { value: 'dark', label: 'Dark', icon: faMoon },
        { value: 'system', label: 'System', icon: faDesktop },
    ]

    // TODO: Move this to a custom hook
    const updateTheme = (newTheme) => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (!prefersDark || newTheme === 'light') {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }

        setTheme(newTheme)
    }

    return (
        <Page title="Settings">
            <Card>
                <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={updateTheme} />
            </Card>
        </Page>
    )
}