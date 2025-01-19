import { useState } from "react";
import Alert from "../components/Alert";
import Page from "../components/Page";

export default function Exercises() {
    const [error, setError] = useState(null)

    return (
        <Page title="Exercises">
            <button className="btn-danger mb-4 mr-4" onClick={() => setError('Lorem ipsum dolor sit amet conse tetur, adipisicing elit. Laboriosam, eaque.')}>Show alert</button>
            <Alert message={error} setMessage={setError} />
        </Page>
    )
}