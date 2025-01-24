import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Page from "../components/Page";
import { db } from "../helpers/db";

export default function Workout() {
    const [activeWorkout, setActiveWorkout] = useState(db.getActiveWorkout())

    const handleDateTimeChange = (e) => {
        // setActiveWorkout({ ...activeWorkout, date: e.target.value })
        setActiveWorkout((prev) => {
            return { ...prev, date: e.target.value }
        })
    }

    useEffect(() => {
        let saveTimeout

        saveTimeout = setTimeout(() => {
            db.updateWorkout(activeWorkout.id, activeWorkout)
            // TODO: Show saving indicator (with context?)
            console.log('Saving workout...')
        }, 1000)

        return () => {
            clearTimeout(saveTimeout)
        }
    }, [activeWorkout])

    return (
        <Page title="Workout">
            <Card>
                <label htmlFor="workoutDateTime">Start of workout</label>
                <input type="datetime-local" name="workoutDateTime" id="workoutDateTime" value={activeWorkout.date} onChange={handleDateTimeChange} className="w-full border border-gray-500" />
                <button className="btn-secondary">Finish workout</button>
            </Card>

            <Card title={<><FontAwesomeIcon icon={faGripVertical} className="mr-3" />Machine name</>} collapsible>
                <textarea className="w-full border border-gray-500" value="Machine description" onChange={() => { }}></textarea>
                {/* <table className="w-full">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Weight</th>
                            <th>Reps</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input type="number" name="" id="" value={100} className="border border-gray-500" /></td>
                            <td><input type="number" name="" id="" value={10} className="border border-gray-500" /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><input type="number" name="" id="" value={100} className="border border-gray-500" /></td>
                            <td><input type="number" name="" id="" value={10} className="bg-red-300" /></td>
                        </tr>
                    </tbody>
                </table> */}
                {/* <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-4">
                        <p>Set</p>
                        <p>Weight</p>
                        <p>Reps</p>
                        <p>Remove</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <p>1</p>
                        <div>
                            <label htmlFor="" className="sr-only">Set 2</label>
                            <input type="number" name="" id="" value={100} className="w-full border border-gray-500" />
                        </div>
                        <div>
                            <label htmlFor="" className="sr-only">Set 3</label>
                            <input type="number" name="" id="" value={10} className="w-full border border-gray-500" />
                        </div>
                        <button className="btn-danger !p-0"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div> */}
            </Card>

            <button className="btn-primary">Add exercise</button>
        </Page>
    )
}