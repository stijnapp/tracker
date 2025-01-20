import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Page from "../components/Page";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'system')

    const themeOptions = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' },
    ]

    return (
        <Page title="Settings">
            {/* <button onClick={toggleDarkmode} className="btn-primary">Toggle darkmode</button> */}
            <RadioButtonGroup label="Theme" options={themeOptions} value={theme} setValue={setTheme} />
        </Page>
    )
}