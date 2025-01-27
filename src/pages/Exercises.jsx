import { useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Page from "../components/Page";

export default function Exercises() {
    const [text, setText] = useState(null)
    const [restartAnimationOnChange, setRestartAnimationOnChange] = useState(false)

    return (
        <Page title="Exercises">
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
        </Page>
    )
}