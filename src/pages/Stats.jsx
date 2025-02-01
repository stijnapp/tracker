import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Card from "../components/Card";
import Checkbox from "../components/Form/Checkbox";
import FancyRadioButtonGroup from "../components/Form/FancyRadioButtonGroup";
import FileInput from "../components/Form/FileInput";
import Input from "../components/Form/Input";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Select from "../components/Form/Select";
import Switch from "../components/Form/Switch";
import Textarea from "../components/Form/Textarea";
import Page from "../components/Page";
import UnderConstruction from "../components/Temp/UnderConstruction";

export default function Stats() {
    // const [text, setText] = useState(null)
    // const [restartOnChildKeyChange, setRestartOnChildKeyChange] = useState(false)

    // const [error, setError] = useState(null)
    // const [absoluteAlerts, setAbsoluteAlerts] = useState(false)

    const [inputs, setInputs] = useState({
        text: '',
        email: '',
        password: '',
        tel: '',
        number: '',
        date: '',
        time: '',
        datetime: '',
        url: '',
        color: '#1d8098',
    })

    const [textArea, setTextArea] = useState('')

    const [file, setFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const [radio, setRadio] = useState('1')
    const radioOptions = [
        { value: '1', label: 'Option 1', icon: fa1 },
        { value: '2', label: 'Option 2', icon: fa2 },
        { value: '3', label: 'Option 3', icon: fa3 },
    ]

    const [select, setSelect] = useState('1')
    const selectOptions = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ]

    const [boolean, setBoolean] = useState(false)

    return (
        <Page title="Stats">
            <UnderConstruction />

            {/* <Card title="AnimateInOut test" className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={restartOnChildKeyChange} onChange={() => setRestartOnChildKeyChange(!restartOnChildKeyChange)} />
                    <span>Restart animation on change</span>
                </label>
                <button className="btn-primary" onClick={() => setText('First')}>Show &apos;First text&apos;</button>
                <button className="btn-success" onClick={() => setText('Second')}>Show &apos;Second text&apos;</button>
                <button className="btn-secondary" onClick={() => setText(null)}>Remove text</button>
                <AnimateInOut restartOnChildKeyChange={restartOnChildKeyChange}>
                    {text && (
                        <div key={text} className={`p-4 ${text === 'First' ? 'bg-primary/30' : 'bg-success/30'} rounded-md`}>
                            {text}
                        </div>
                    )}
                </AnimateInOut>
            </Card> */}

            {/* <Card title="Alert test" className="flex flex-col gap-4">
                {error !== null ? <p className="text-sm text-danger">There is an error</p> : <p className="text-sm text-success">No errors</p>}
                <button className="btn-danger" onClick={() => setError('Lorem ipsum dolor sit amet conse tetur, adipisicing elit. Laboriosam, eaque.')}>Show alert</button>
                <button className="btn-warning" onClick={() => setError('Change')}>Change alert text</button>
                <Alert message={error} setMessage={setError} autoClose />

                <HR className="h-8 -mb-2" />
                <p className="font-semibold text-xl">Styles</p>
                <div className={absoluteAlerts && 'fixed bottom-16 right-0 w-full flex flex-col gap-4 p-4 z-20'}>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 p-2 bg-floating-light dark:bg-floating-dark rounded-md border border-gray-500/50">
                            <input type="checkbox" checked={absoluteAlerts} onChange={() => setAbsoluteAlerts(!absoluteAlerts)} />
                            <span>Absolute alerts</span>
                        </label>
                        <Alert message="Primary alert" isCloseable={false} type="primary" />
                        <Alert message="Secondary alert" isCloseable={false} type="secondary" />
                        <Alert message="Danger alert" isCloseable={false} type="danger" />
                        <Alert message="Warning alert" isCloseable={false} type="warning" />
                        <Alert message="Info alert" isCloseable={false} type="info" />
                        <Alert message="Success alert" isCloseable={false} type="success" />
                    </div>
                </div>
            </Card> */}

            {/* <Card title="Button test">
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
            </Card> */}

            <Card title="Inputs" className="flex flex-col gap-4">
                <Input type="text" label="Text label" value={inputs.text} onChange={(e) => setInputs({ ...inputs, text: e.target.value })} required />
                <Input type="email" label="Email label" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
                <Input type="password" label="Password label" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required />
                <Input type="tel" label="tel label" value={inputs.tel} onChange={(e) => setInputs({ ...inputs, tel: e.target.value })} required />
                <Input type="number" label="Number label" value={inputs.number} onChange={(e) => setInputs({ ...inputs, number: e.target.value })} required />
                <Input type="date" label="Date label" value={inputs.date} onChange={(e) => setInputs({ ...inputs, date: e.target.value })} required />
                <Input type="time" label="Time label" value={inputs.time} onChange={(e) => setInputs({ ...inputs, time: e.target.value })} required />
                <Input type="datetime-local" label="Datetime label" value={inputs.datetime} onChange={(e) => setInputs({ ...inputs, datetime: e.target.value })} required />
                <Input type="url" label="Url label" value={inputs.url} onChange={(e) => setInputs({ ...inputs, url: e.target.value })} required />
                <Input type="color" label="Color label" value={inputs.color} onChange={(e) => setInputs({ ...inputs, color: e.target.value })} required />
            </Card>

            <Card title="Textarea">
                <Textarea label="Textarea label" value={textArea} onChange={(e) => setTextArea(e.target.value)} required />
            </Card>

            <Card title="File" className="flex flex-col gap-4">
                <FileInput label="File label" value={file} onChange={setFile} required />
                <FileInput label="File with preview" value={filePreview} onChange={setFilePreview} showPreview required />
            </Card>

            <Card title="Radio Button Group" className="flex flex-col gap-4">
                <RadioButtonGroup label="Radio label" options={radioOptions} value={radio} onChange={(e) => setRadio(e.target.value)} required />
                <FancyRadioButtonGroup label="Fancy radio" options={radioOptions} value={radio} onChange={(e) => setRadio(e.target.value)} defaultValue="1" required />
            </Card>

            <Card title="Select">
                <Select label="Select label" options={selectOptions} value={select} onChange={(e) => setSelect(e.target.value)} required />
                {/* TODO: select with search */}
            </Card>

            <Card title="Checkbox" className="flex flex-col gap-4">
                <Checkbox label="Checkbox label" checked={boolean} onChange={() => setBoolean(!boolean)} required />
                <Switch label="Switch label" checked={boolean} onChange={() => setBoolean(!boolean)} required />
            </Card>

            <Card title="Range">
                <input type="range" />
            </Card>
        </Page>
    )
}