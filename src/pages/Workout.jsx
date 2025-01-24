import { useState } from "react";
import Card from "../components/Card";
import Page from "../components/Page";
import { getCurrentDateTime } from "../helpers/dateTime";

export default function Workout() {
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime())

    return (
        <Page title="Workout">
            <Card>
                <input type="datetime-local" value={currentDateTime} onChange={(event) => setCurrentDateTime(event.target.value)} name="" id="" />
                <button className="btn-secondary">Finish workout</button>
            </Card>

            <Card title="Machine name" collapsible>
                <p>Machine description</p>
            </Card>

            <button className="btn-primary">Add exercise</button>
        </Page>
    )
}