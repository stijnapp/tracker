import { useState } from "react";
import Alert from "../components/Alert";
import Card from "../components/Card";
import Page from "../components/Page";

export default function Stats() {
    const [error, setError] = useState(null)

    return (
        <Page title="Stats">
            <Card title="Button test" className="flex flex-col gap-1">
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

            <Card title="Alert test">
                <button className="btn-danger mb-4 mr-4" onClick={() => setError('Lorem ipsum dolor sit amet conse tetur, adipisicing elit. Laboriosam, eaque.')}>Show alert</button>
                <Alert message={error} setMessage={setError} />
            </Card>
        </Page>
    )
}