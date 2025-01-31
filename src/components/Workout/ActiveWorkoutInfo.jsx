import { useEffect, useState } from "react"
import { db } from "../../helpers/db"
import Card from "../Card"
import Input from "../Form/Input"

export default function ActiveWorkoutInfo({ activeWorkoutId }) {
    const [activeWorkoutInfo, setActiveWorkoutInfo] = useState(db.getWorkoutInfo(activeWorkoutId))

    const handleStartChange = (e) => {
        const newStart = e.target.value
        db.updateWorkoutInfo(activeWorkoutId, { ...activeWorkoutInfo, date: newStart })
        setActiveWorkoutInfo(db.getWorkoutInfo(activeWorkoutId))
    }

    useEffect(() => {
        setActiveWorkoutInfo(db.getWorkoutInfo(activeWorkoutId))
    }, [activeWorkoutId])

    return (
        <Card>
            {/* TODO: "{time of day} workout" */}
            <Input type="datetime-local" label="Start of workout" value={activeWorkoutInfo.date} onChange={handleStartChange} className="mt-1" />
        </Card>
    )
}