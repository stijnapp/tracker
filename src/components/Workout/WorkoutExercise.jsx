import { useState } from 'react'
import { db } from '../../helpers/db'
import AnimateInOut from '../AnimateInOut'
import Collapse from '../Collapse'
import Textarea from '../Form/Textarea'
import Set from './Set'

export default function WorkoutExercise({ workoutId, workoutExerciseId, onDelete, openByDefault = false }) {
    const [exerciseId] = useState(db.getWorkoutExerciseById(workoutId, workoutExerciseId).exerciseId)
    const [exercise, setExercise] = useState(db.getExerciseById(exerciseId))
    const [setIds, setSetIds] = useState(db.getSetIds(workoutId, workoutExerciseId))
    const [isDeleted, setIsDeleted] = useState(false)

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value
        db.updateExercise(exerciseId, { ...exercise, description: newDescription })
        setExercise(db.getExerciseById(exerciseId))
    }

    const handleAddSet = () => {
        db.addSet(workoutId, workoutExerciseId)
        setSetIds(db.getSetIds(workoutId, workoutExerciseId))
    }

    const handleDeleteSet = (setId) => {
        db.deleteSet(workoutId, workoutExerciseId, setId)
        setSetIds(db.getSetIds(workoutId, workoutExerciseId))
    }

    const handleDeleteExercise = () => {
        setIsDeleted(true)
        setTimeout(() => {
            db.deleteWorkoutExercise(workoutId, workoutExerciseId)
            onDelete(workoutExerciseId)
        }, 300)
    }

    return (
        <AnimateInOut className='rounded-lg' hiddenClassName="-mt-4" disableOverflowSpace>
            {!isDeleted && (
                <Collapse title={exercise.name} subtitle={exercise.nickname} openByDefault={openByDefault} className="flex flex-col gap-4 mt-1.5">
                    <div className="flex gap-2">
                        <div className="w-0 border-2 rounded-full border-primary"></div>
                        <Textarea label="Description" value={exercise.description ?? ''} onChange={handleDescriptionChange} className="flex-grow" />
                    </div>

                    {setIds.map((setId, index) => (
                        <Set key={setId} workoutId={workoutId} workoutExerciseId={workoutExerciseId} setId={setId} setNr={index + 1} onDelete={handleDeleteSet} />
                    ))}
                    <button className="btn-primary w-full" onClick={handleAddSet}>Add set</button>

                    <AnimateInOut hiddenClassName="-mt-4" animateOnMount>
                        {setIds.length <= 0 && (
                            <button className="btn-danger w-full" onClick={handleDeleteExercise}>Delete empty exercise</button>
                        )}
                    </AnimateInOut>
                </Collapse>
            )}
        </AnimateInOut>
    )
}