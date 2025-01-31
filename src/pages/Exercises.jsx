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

export default function Exercises() {
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
        <Page title="Exercises">
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
                <Textarea label="Textarea label" value={textArea} setValue={setTextArea} required />
            </Card>

            <Card title="File" className="flex flex-col gap-4">
                <FileInput label="File label" value={file} onChange={setFile} required />
                <FileInput label="File with preview" value={filePreview} onChange={setFilePreview} showPreview required />
            </Card>

            <Card title="Radio Button Group" className="flex flex-col gap-4">
                <RadioButtonGroup label="Radio label" options={radioOptions} value={radio} setValue={setRadio} required />
                <FancyRadioButtonGroup label="Fancy radio" options={radioOptions} value={radio} setValue={setRadio} defaultValue="1" required />
            </Card>

            <Card title="Select">
                <Select label="Select label" options={selectOptions} value={select} setValue={setSelect} required />
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