import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Card from "../components/Card";
import FileInput from "../components/Form/FileInput";
import Input from "../components/Form/Input";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Select from "../components/Form/Select";
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

    return (
        <Page title="Exercises">

            <Card title="Inputs" className="flex flex-col gap-4">
                {/* input: text, email, password, tel, number, (date, time, datetime), url, color?*/}
                <Input type="text" label="Text label" value={inputs.text} setValue={(value) => setInputs({ ...inputs, text: value })} />
                <Input type="email" label="Email label" value={inputs.email} setValue={(value) => setInputs({ ...inputs, email: value })} />
                <Input type="password" label="Password label" value={inputs.password} setValue={(value) => setInputs({ ...inputs, password: value })} />
                <Input type="tel" label="tel label" value={inputs.tel} setValue={(value) => setInputs({ ...inputs, tel: value })} />
                <Input type="number" label="Number label" value={inputs.number} setValue={(value) => setInputs({ ...inputs, number: value })} />
                <Input type="date" label="Date label" value={inputs.date} setValue={(value) => setInputs({ ...inputs, date: value })} />
                <Input type="time" label="Time label" value={inputs.time} setValue={(value) => setInputs({ ...inputs, time: value })} />
                <Input type="datetime-local" label="Datetime label" value={inputs.datetime} setValue={(value) => setInputs({ ...inputs, datetime: value })} />
                <Input type="url" label="Url label" value={inputs.url} setValue={(value) => setInputs({ ...inputs, url: value })} />
                <Input type="color" label="Color label" value={inputs.color} setValue={(value) => setInputs({ ...inputs, color: value })} />
            </Card>

            <Card title="Textarea">
                {/* textarea */}
                <Textarea label="Textarea label" value={textArea} setValue={setTextArea} />
            </Card>

            <Card title="File">
                {/* file */}
                <FileInput label="File label" value={file} setValue={setFile} />
            </Card>

            <Card title="Radio Button Group">
                {/* TODO: default */}
                <RadioButtonGroup label="Radio label" options={radioOptions} value={radio} setValue={setRadio} defaultValue="1" />
            </Card>

            <Card title="Select">
                {/* select */}
                <Select label="Select label" options={selectOptions} value={select} setValue={setSelect} />
            </Card>

            <Card title="Checkbox">
                {/* checkbox */}
                <label>
                    <input type="checkbox" />
                    checkbox
                </label>
            </Card>

            <Card title="Switch">
                {/* switch */}
                {/* <Switch label="Theme" value={theme} setValue={setTheme} /> */}
            </Card>

            <Card title="Range">
                {/* range */}
                <input type="range" />
            </Card>
        </Page>
    )
}