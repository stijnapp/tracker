import { useEffect, useRef, useState } from "react";
import { db } from "../../helpers/db";
import Collapse from "../Collapse";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Set from "./Set";

export default function WorkoutExercise({ workoutId, workoutExerciseId, newestExercise = false }) {
    const [exerciseId] = useState(db.getWorkoutExerciseById(workoutId, workoutExerciseId).exerciseId)
    const [exercise, setExercise] = useState(db.getExerciseById(exerciseId))
    const [setIds, setSetIds] = useState(db.getSetIds(workoutId, workoutExerciseId))
    const maxSetId = setIds.length > 0 ? Math.max(...setIds) : 0

    const weightInputRef = useRef(null)
    const repsInputRef = useRef(null)
    const [newSet, setNewSet] = useState(null)

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value
        db.updateExercise(exerciseId, { ...exercise, description: newDescription })
        setExercise(db.getExerciseById(exerciseId))
    }

    const handleAddSet = (e) => {
        const newSetId = db.addSet(workoutId, workoutExerciseId).id
        const type = e.target.dataset.type
        const value = e.target.value
        setNewSet({ setId: newSetId, type })

        db.updateSet(workoutId, workoutExerciseId, newSetId, {
            weight: type === 'weight' ? value : null,
            reps: type === 'reps' ? value : null
        })

        setSetIds(db.getSetIds(workoutId, workoutExerciseId))
    }

    const handleDeleteSet = (type) => {
        db.removeLastEmptySets(workoutId, workoutExerciseId)
        setSetIds(db.getSetIds(workoutId, workoutExerciseId))

        if (type === 'weight') {
            weightInputRef.current.focus()
        } else if (type === 'reps') {
            repsInputRef.current.focus()
        }
    }

    useEffect(() => {
        if (newSet) setNewSet(null)
    }, [newSet])

    const cardHeader = (
        <div>
            {exercise.name}
            {exercise.nickname && <p className="text-base font-normal -mt-0.5 text-gray-500 dark:text-gray-400">- {exercise.nickname}</p>}
        </div>
    )

    return (
        <Collapse title={cardHeader} openByDefault={newestExercise}>
            <div className="flex gap-2">
                <div className="w-0 border-2 rounded-full border-primary"></div>
                <Textarea label="Description" value={exercise.description ?? ''} onChange={handleDescriptionChange} className="flex-grow" />
            </div>

            <div className="grid grid-cols-7 gap-4 items-center">
                {setIds.map((setId) => {
                    return (
                        <Set key={setId} workoutId={workoutId} workoutExerciseId={workoutExerciseId} setId={setId} newSet={newSet} potentialDelete={setId === maxSetId ? handleDeleteSet : null} />
                    )
                })}
                <p className="opacity-50 col-span-1 text-sm text-gray-500 dark:text-gray-400 text-nowrap">Set {maxSetId + 1}</p>
                <Input inputRef={weightInputRef} type="number" label="Weight" value={''} onChange={handleAddSet} data-type="weight" className="opacity-50 col-span-3" />
                <Input inputRef={repsInputRef} type="number" label="Reps" value={''} onChange={handleAddSet} data-type="reps" className="opacity-50 col-span-3" />
            </div>
        </Collapse>
    )
}