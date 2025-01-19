import Page from "../components/Page";

export default function Workout() {
    return (
        <Page title="Workout">
            {/* Temp button tests */}
            <div className="flex flex-col gap-1">
                <p className="font-bold">Basic</p>
                <div className="flex flex-row gap-2 transition-transform duration-200">
                    <button className="btn-primary">Primary</button>
                    <button className="btn-secondary">Secondary</button>
                </div>
                <p className="font-bold mt-4">Extra</p>
                <div className="flex flex-row gap-2 transition-transform duration-200">
                    <button className="btn-danger">Danger</button>
                    <button className="btn-warning">Warning</button>
                    <button className="btn-success">Success</button>
                    <button className="btn-info">Info</button>
                </div>
            </div>
        </Page>
    )
}