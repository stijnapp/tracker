import { useState } from "react";
import Alert from "../components/Alert";
import AnimateInOut from "../components/AnimateInOut";
import Card from "../components/Card";
import Page from "../components/Page";

export default function Stats() {
    const [error, setError] = useState(null)

    const [text, setText] = useState(null)
    const [restartAnimationOnChange, setRestartAnimationOnChange] = useState(false)

    return (
        <Page title="Stats">
            <Card title="Alert test" className="flex flex-col gap-4">
                {error !== null ? <p className="text-sm text-danger">There is an error</p> : <p className="text-sm text-success">No errors</p>}
                <button className="btn-danger" onClick={() => setError('Lorem ipsum dolor sit amet conse tetur, adipisicing elit. Laboriosam, eaque.')}>Show alert</button>
                <button className="btn-secondary" onClick={() => setError('Change')}>Change alert text</button>
                <button className="btn-warning" disabled={error === null} onClick={() => setError(null)}>Clear text</button>
                <Alert message={error} setMessage={setError} autoClose />
            </Card>

            <Card title="AnimateInOut test" className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={restartAnimationOnChange} onChange={() => setRestartAnimationOnChange(!restartAnimationOnChange)} />
                    <span>Restart animation on change</span>
                </label>
                <button className="btn-primary" onClick={() => setText('First')}>Show &apos;First text&apos;</button>
                <button className="btn-success" onClick={() => setText('Second')}>Show &apos;Second text&apos;</button>
                <button className="btn-secondary" onClick={() => setText(null)}>Remove text</button>
                <AnimateInOut restartAnimationOnChange={restartAnimationOnChange}>
                    {text && (
                        <div className={`p-4 ${text === 'First' ? 'bg-primary/30' : 'bg-success/30'} rounded-md`}>
                            {text}
                        </div>
                    )}
                </AnimateInOut>
                <button className="btn-secondary" disabled>.</button>
            </Card>

            <Card title="Button test">
                <p className="font-semibold">Basic</p>
                <div className="flex flex-row flex-wrap gap-2">
                    <button className="btn-primary">Primary</button>
                    <button className="btn-secondary">Secondary</button>
                </div>
                <p className="font-semibold mt-4">Extra</p>
                <div className="flex flex-row flex-wrap gap-2">
                    <button className="btn-danger">Danger</button>
                    <button className="btn-warning">Warning</button>
                    <button className="btn-success">Success</button>
                    <button className="btn-info">Info</button>
                </div>
            </Card>

            <Card title="Disabled buttons">
                <p className="font-semibold">Basic</p>
                <div className="flex flex-row flex-wrap gap-2">
                    <button className="btn-primary" disabled>Primary</button>
                    <button className="btn-secondary" disabled>Secondary</button>
                </div>
                <p className="font-semibold mt-4">Extra</p>
                <div className="flex flex-row flex-wrap gap-2">
                    <button className="btn-danger" disabled>Danger</button>
                    <button className="btn-warning" disabled>Warning</button>
                    <button className="btn-success" disabled>Success</button>
                    <button className="btn-info" disabled>Info</button>
                </div>
            </Card>
        </Page>
    )
}