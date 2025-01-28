import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Page from "../components/Page";
import { db } from "../helpers/db";

export default function Workout() {
    const [activeWorkout, setActiveWorkout] = useState(db.getActiveWorkout())
    const [exercises, setExercises] = useState(db.getAllExercises())
    const debounceTimeout = 1000

    const handleChangeExercise = (newExercise) => {
        setExercises((prev) => prev.map((exercise) => exercise.id === newExercise.id ? newExercise : exercise))
    }

    useEffect(() => {
        let saveTimeout

        saveTimeout = setTimeout(() => {
            if (!activeWorkout) return
            db.updateWorkout(activeWorkout.id, activeWorkout)
            // TODO: Show saving indicator (with context?)
            console.log('Saving workout...')
        }, debounceTimeout)

        // TODO: this will cancel the save if the user navigates away from the page
        return () => {
            clearTimeout(saveTimeout)
        }
    }, [activeWorkout])

    useEffect(() => {
        let saveTimeout

        console.log('exercises changed')

        saveTimeout = setTimeout(() => {
            if (!activeWorkout) return
            db.updateAllExercises(exercises)
            console.log('Saving exercises...')
        }, debounceTimeout)

        // TODO: this will cancel the save if the user navigates away from the page
        return () => {
            clearTimeout(saveTimeout)
        }
    }, [activeWorkout, exercises])

    return (
        <Page title="Workout">
            {!activeWorkout ? <>
                <button className="btn-primary" onClick={() => setActiveWorkout(db.addWorkout())}>Start workout</button>
            </> : <>
                <Card>
                    <label htmlFor="workoutDateTime">Start of workout</label>
                    <input type="datetime-local" name="workoutDateTime" id="workoutDateTime" value={activeWorkout.date} onChange={(e) => setActiveWorkout((prev) => ({ ...prev, date: e.target.value }))} className="w-full border border-gray-500" />
                    <button className="btn-secondary">Finish workout</button>
                </Card>

                {activeWorkout.exercises.map((exercise) => {
                    const currentExercise = exercises.find((e) => e.id === exercise.id)

                    return (
                        <Card key={exercise.id} title={<><FontAwesomeIcon icon={faGripVertical} className="mr-3" />{currentExercise.name}</>} collapsible>
                            <textarea className="w-full border border-gray-500" value={currentExercise.description} onChange={(e) => handleChangeExercise({ ...currentExercise, description: e.target.value })}></textarea>
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
                    )
                })}

                <button className="btn-primary">Add exercise</button>
            </>}
        </Page>
    )
}