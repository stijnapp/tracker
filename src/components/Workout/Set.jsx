import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"
import { db } from "../../helpers/db"
import AnimateInOut from '../AnimateInOut'
import Input from "../Form/Input"

export default function Set({ workoutId, workoutExerciseId, setId, setNr, onDelete }) {
    const [set, setSet] = useState(db.getSetById(workoutId, workoutExerciseId, setId))
    const [isDeleted, setIsDeleted] = useState(false)

    const handleWeightChange = (e) => {
        let newWeight = e.target.valueAsNumber
        if (!e.target.checkValidity()) {
            newWeight = set.weight
        }
        db.updateSet(workoutId, workoutExerciseId, setId, { ...set, weight: newWeight })
        setSet(db.getSetById(workoutId, workoutExerciseId, setId))
    }

    const handleRepsChange = (e) => {
        let newReps = e.target.valueAsNumber
        if (!e.target.checkValidity()) {
            newReps = set.reps
        }
        db.updateSet(workoutId, workoutExerciseId, setId, { ...set, reps: newReps })
        setSet(db.getSetById(workoutId, workoutExerciseId, setId))
    }

    const handleDelete = () => {
        setIsDeleted(true)
        setTimeout(() => {
            onDelete(set.id)
        }, 300)
    }

    return (
        <AnimateInOut className='flex gap-2' hiddenClassName='-mt-4' animateOnMount>
            {!isDeleted && <>
                <div className='flex gap-2 items-center w-full'>
                    <p className="min-w-10 text-sm text-gray-500 dark:text-gray-400 text-nowrap">Set {setNr}</p>
                    <Input type="number" step="0.01" min="0" label="Weight" value={set.weight ?? ''} onChange={handleWeightChange} />
                    <Input type="number" step="0.1" min="0" label="Reps" value={set.reps ?? ''} onChange={handleRepsChange} />
                </div>
                <AnimateInOut direction='horizontal' className='flex -mr-2 pr-4' hiddenClassName='-ml-4'>
                    {!set.weight && !set.reps && (
                        <button className="btn-danger" onClick={handleDelete} aria-label="Delete set"><FontAwesomeIcon icon={faTrash} /></button>
                    )}
                </AnimateInOut>
            </>}
        </AnimateInOut>
    )
}