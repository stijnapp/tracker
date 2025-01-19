import Page from "../components/Page";

export default function Settings() {
    const toggleDarkmode = () => {
        document.documentElement.classList.toggle('dark')
    }

    return (
        <Page title="Settings">
            <button onClick={toggleDarkmode} className="btn-primary">Toggle darkmode</button>
        </Page>
    )
}