import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
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

        // console.log('exercises changed')

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
                </Card>

                {activeWorkout.exercises.sort((a, b) => a.order - b.order).map((exercise) => {
                    const currentExercise = exercises.find((e) => e.id === exercise.id)

                    return (
                        <Card key={exercise.id} title={<div className="flex justify-between">{currentExercise.name}<FontAwesomeIcon icon={faAngleDown} className="w-6 h-6" /></div>} collapsible>
                            {currentExercise.nickname && <p className="mb-4 -mt-4 text-gray-500 dark:text-gray-400">{currentExercise.nickname}</p>}
                            <textarea className="w-full border p-1 border-gray-400 rounded-md" value={currentExercise.description ?? ''} onChange={(e) => handleChangeExercise({ ...currentExercise, description: e.target.value })}></textarea>

                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="p-2">Set</th>
                                        <th className="p-2">Weight</th>
                                        <th className="p-2">Reps</th>
                                    </tr>
                                </thead>
                                {/* TODO: where to add previous results to compare? */}
                                <tbody>
                                    {exercise.sets.map((set) => (
                                        <tr key={set.id} className="border-b border-gray-500/50">
                                            <td className="p-2">{set.id}</td>
                                            <td className="p-2">
                                                {/* <label>Weight (prev: 25)</label> */}
                                                <input type="number" name="" id="" value={set.weight} onChange={() => { }} className="w-full border p-1 border-gray-400 rounded-md" /></td>
                                            <td className="p-2">
                                                {/* <label>Reps (prev: 12)</label> */}
                                                <input type="number" name="" id="" value={set.reps} onChange={() => { }} className="w-full border p-1 border-gray-400 rounded-md" /></td>
                                        </tr>
                                    ))}
                                    <tr className="opacity-50">
                                        <td className="p-2">3</td>
                                        <td className="p-2">
                                            {/* <label>Weight (prev: 20)</label> */}
                                            <input type="number" name="" id="" value={''} onChange={() => { }} className="w-full border p-1 border-gray-400 rounded-md" /></td>
                                        <td className="p-2">
                                            {/* <label>Reps (prev: 12)</label> */}
                                            <input type="number" name="" id="" value={''} onChange={() => { }} className="w-full border p-1 border-gray-400 rounded-md" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    )
                })}

                <button className="btn-primary">Add exercise</button>
                <button className="btn-danger">End workout</button>
            </>}
        </Page>
    )
}

// export function ActiveWorkout() {
//     // start of workout
//     // foreach exerciseId: <Exercise workoutId={id} exerciseId={exerciseId} />
// }

// export function Exercise({ workoutId, exerciseId }) {
//     // name
//     // nickname
//     // description
//     // foreach setId: <Set workoutId={workoutId} exerciseId={exerciseId} setId={setId} />

//     // <Collapsible>
//     //     <CollapsibleHeader/>
//     //     <CollapsibleContent/>
//     // </Collapsible>
// }

// export function Set({ workoutId, exerciseId, setId }) {
//     // weight
//     // reps
//     // previous results
// }