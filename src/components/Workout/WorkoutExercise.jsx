import { faHistory, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { dateToText, timeDifferenceToText } from '../../helpers/dateTime'
import { db } from '../../helpers/db'
import AnimateInOut from '../AnimateInOut'
import Collapse from '../Collapse'
import Textarea from '../Form/Textarea'
import Modal from '../Modal'
import Set from './Set'

export default function WorkoutExercise({ workoutId, workoutExerciseId, onDelete, openByDefault = false }) {
    const [exerciseId] = useState(db.getWorkoutExerciseById(workoutId, workoutExerciseId).exerciseId)
    const [exercise, setExercise] = useState(db.getExerciseById(exerciseId))
    const [setIds, setSetIds] = useState(db.getSetIds(workoutId, workoutExerciseId))

    const [isDeleted, setIsDeleted] = useState(false)

    const [exerciseHistory] = useState(db.getExerciseHistoryById(exerciseId))
    const [showHistoryModal, setShowHistoryModal] = useState(false)

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

    const closeBtn = (
        <button className="btn-danger !py-1.5 !px-3 -my-1" onClick={handleDeleteExercise} aria-label="Delete empty exercise"><FontAwesomeIcon icon={faTrash} /></button>
    )

    return (
        <>
            <AnimateInOut className='rounded-lg' hiddenClassName="-mt-4" disableOverflowSpace>
                {!isDeleted && (
                    <Collapse title={exercise.name} subtitle={exercise.nickname} extraButton={closeBtn} showExtraButton={setIds.length <= 0} openByDefault={openByDefault} className="flex flex-col gap-4 mt-1.5">
                        <div className="flex gap-2">
                            <div className="w-0 border-2 rounded-full border-primary"></div>
                            <Textarea label="Description" value={exercise.description ?? ''} onChange={handleDescriptionChange} className="flex-grow" />
                        </div>

                        {setIds.map((setId, index) => (
                            <Set key={setId} workoutId={workoutId} workoutExerciseId={workoutExerciseId} setId={setId} setNr={index + 1} prevResult={exerciseHistory[0].sets[index]} onDelete={handleDeleteSet} />
                        ))}

                        <button className="btn-primary" onClick={handleAddSet}><FontAwesomeIcon icon={faPlus} className="mr-2" />Add set</button>
                        <button className="btn-secondary" onClick={() => setShowHistoryModal(true)}><FontAwesomeIcon icon={faHistory} className="mr-2" />Previous results</button>
                    </Collapse>
                )}
            </AnimateInOut>
            <Modal showModal={showHistoryModal} onClose={() => setShowHistoryModal(false)} title="Exercise history" className="gap-6">
                {exerciseHistory.map((entry, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">{dateToText(entry.date)} <span className='subtext'>({timeDifferenceToText(entry.date)})</span></p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {entry.sets.map((set, index) => (
                                <div key={index} className="flex justify-evenly gap-2">
                                    <p className='w-full'>Set {index + 1}</p>
                                    <p className='w-full'>{set.weight}kg</p>
                                    <p className='w-full'>{set.reps} reps</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Modal>
        </>
    )
}