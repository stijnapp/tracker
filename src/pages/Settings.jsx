import Page from "../components/Page";

export default function Settings() {
    // TODO: replace with radio button and save to localstorage
    const toggleDarkmode = () => {
        document.documentElement.classList.toggle('dark')
    }

    return (
        <Page title="Settings">
            <button onClick={toggleDarkmode} className="btn-primary">Toggle darkmode</button>
        </Page>
    )
}