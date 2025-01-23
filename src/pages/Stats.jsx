import { useState } from "react";
import Alert from "../components/Alert";
import Card from "../components/Card";
import Page from "../components/Page";

export default function Stats() {
    const [error, setError] = useState(null)

    return (
        <Page title="Stats">
            <Card title="Button test">
                <p className="font-semibold">Basic</p>
                <div className="flex flex-row flex-wrap gap-2 transition-transform duration-200">
                    <button className="btn-primary">Primary</button>
                    <button className="btn-secondary">Secondary</button>
                </div>
                <p className="font-semibold mt-4">Extra</p>
                <div className="flex flex-row flex-wrap gap-2 transition-transform duration-200">
                    <button className="btn-danger">Danger</button>
                    <button className="btn-warning">Warning</button>
                    <button className="btn-success">Success</button>
                    <button className="btn-info">Info</button>
                </div>
            </Card>

            <Card title="Disabled buttons">
                <p className="font-semibold">Basic</p>
                <div className="flex flex-row flex-wrap gap-2 transition-transform duration-200">
                    <button className="btn-primary" disabled>Primary</button>
                    <button className="btn-secondary" disabled>Secondary</button>
                </div>
                <p className="font-semibold mt-4">Extra</p>
                <div className="flex flex-row flex-wrap gap-2 transition-transform duration-200">
                    <button className="btn-danger" disabled>Danger</button>
                    <button className="btn-warning" disabled>Warning</button>
                    <button className="btn-success" disabled>Success</button>
                    <button className="btn-info" disabled>Info</button>
                </div>
            </Card>

            <Card title="Alert test" className="flex flex-col gap-4">
                <button className="btn-danger" onClick={() => setError('Lorem ipsum dolor sit amet conse tetur, adipisicing elit. Laboriosam, eaque.')}>Show alert</button>
                <Alert message={error} setMessage={setError} autoClose />
                <button className="btn-secondary" disabled>asdf</button>
            </Card>
        </Page>
    )
}