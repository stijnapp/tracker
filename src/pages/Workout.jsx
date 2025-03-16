import { faFlagCheckered, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import AnimateInOut from '../components/AnimateInOut'
import Search from '../components/Form/Search'
import HR from '../components/HR'
import Modal from '../components/Modal'
import Page from '../components/Page'
import ActiveWorkoutInfo from '../components/Workout/ActiveWorkoutInfo'
import WorkoutExercise from '../components/Workout/WorkoutExercise'
import { db } from '../helpers/db'

const organizeExercisesByTag = () => {
    const allExercises = db.getAllExercises()
        .map((exercise) => {
            exercise.lastTime = new Date(db.getExerciseHistoryById(exercise.id)[0]?.date || 0)
            return exercise
        })
    return db.getAllTags()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((tag) => {
            tag.exercises = allExercises
                .filter((exercise) => exercise.tagId === tag.id)
                .sort((a, b) => {
                    if (a.lastTime < b.lastTime) return 1
                    if (a.lastTime > b.lastTime) return -1
                    return 0
                })
            return tag
        })
        .filter((tag) => tag.exercises.length > 0)
}

export default function Workout() {
    const [activeWorkoutId, setActiveWorkoutId] = useState(db.getActiveWorkoutId())
    const [workoutExerciseIds, setWorkoutExerciseIds] = useState(db.getWorkoutExerciseIds(activeWorkoutId))

    const [isEndingModalOpen, setIsEndingModalOpen] = useState(false)
    const [isAddingExerciseModalOpen, setIsAddingExerciseModalOpen] = useState(false)

    const [allExercises] = useState(organizeExercisesByTag())
    const [search, setSearch] = useState("")

    const startNewWorkout = () => {
        const newWorkoutId = db.addWorkout().id
        setActiveWorkoutId(newWorkoutId)
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(newWorkoutId))
    }

    const endworkout = () => {
        // TODO: does something else need saving?
        // TODO: remove empty sets
        db.endActiveWorkout()
        setActiveWorkoutId(null)
        setWorkoutExerciseIds([])
        setIsEndingModalOpen(false)
        // TODO: global success alert "Workout saved successfully" or "Workout ended"
    }

    const discardWorkout = () => {
        db.deleteWorkout(activeWorkoutId)
        setActiveWorkoutId(null)
        setWorkoutExerciseIds([])
        setIsEndingModalOpen(false)
        // TODO: global alert "Workout discarded"
    }

    const addExercise = (exerciseId) => {
        db.addWorkoutExercise(activeWorkoutId, exerciseId)
        refreshWorkoutExercises()
        setIsAddingExerciseModalOpen(false)
    }

    const refreshWorkoutExercises = () => {
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(activeWorkoutId))
    }

    const isSearchInExercise = (exercise) => {
        return exercise.name.toLowerCase().includes(search.toLowerCase()) || (exercise.nickname && exercise.nickname.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <Page title="Workout">
            <AnimateInOut className="flex flex-col gap-4" hiddenClassName="-mt-4">
                {!activeWorkoutId && <button className="btn-primary" onClick={startNewWorkout}>Start workout</button>}
            </AnimateInOut>

            <AnimateInOut className="flex flex-col gap-4 mb-40">
                {activeWorkoutId && <>
                    <ActiveWorkoutInfo activeWorkoutId={activeWorkoutId} />

                    {workoutExerciseIds.map((exerciseId) => {
                        const isLastWorkoutExercise = exerciseId === workoutExerciseIds[workoutExerciseIds.length - 1]

                        return (
                            <WorkoutExercise key={exerciseId} workoutId={activeWorkoutId} workoutExerciseId={exerciseId} onDelete={refreshWorkoutExercises} openByDefault={isLastWorkoutExercise} />
                        )
                    })}

                    <HR />

                    <button className="btn-primary" onClick={() => setIsAddingExerciseModalOpen(true)}><FontAwesomeIcon icon={faPlus} className="mr-2" />Add exercise</button>
                    <button className="btn-secondary" onClick={() => setIsEndingModalOpen(true)}><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />End workout</button>
                </>}
            </AnimateInOut>

            <Modal showModal={isAddingExerciseModalOpen} onClose={() => setIsAddingExerciseModalOpen(false)} title="Add exercise" onFinishedClosing={() => setSearch("")}>
                <div className='max-h-[calc(100dvh-16rem)] overflow-y-auto'>
                    <div className="flex flex-col gap-4">
                        {allExercises.map((tag) => (
                            <AnimateInOut key={tag.id} hiddenClassName="-mt-4" className="flex flex-col gap-2" disableOverflowSpace>
                                {tag.exercises.some((exercise) => isSearchInExercise(exercise)) ? <>
                                    <h2 className="font-semibold text-lg/4 capitalize">{tag.name}</h2>

                                    {tag.exercises.map((exercise) => (
                                        <AnimateInOut key={exercise.id} hiddenClassName="-mt-2" disableOverflowSpace>
                                            {isSearchInExercise(exercise) &&
                                                <button key={exercise.id} onClick={() => addExercise(exercise.id)} className="btn-primary w-full">{exercise.name}{exercise.nickname && <span className='text-sm opacity-75'> ({exercise.nickname})</span>}</button>} {/* timeDifferenceToText(exercise.lastTime) */}
                                        </AnimateInOut>
                                    ))}
                                </> : null}
                            </AnimateInOut>
                        ))}

                        <AnimateInOut hiddenClassName="-mt-4" disableOverflowSpace>
                            {!allExercises.some((tag) => tag.exercises.some((exercise) => isSearchInExercise(exercise))) ? <p className="text-gray-500 dark:text-gray-400">No exercises found</p> : null}
                        </AnimateInOut>
                    </div>
                </div>
                <Search label="Search for exercise" search={search} setSearch={setSearch} />
                <button className="btn-secondary w-full" onClick={() => setIsAddingExerciseModalOpen(false)}>Cancel</button>
            </Modal>

            <Modal showModal={isEndingModalOpen} onClose={() => setIsEndingModalOpen(false)} title="End workout">
                {workoutExerciseIds.length <= 0
                    ? <p>You haven&apos;t added any exercises yet. Ending the workout will save it as an empty workout.</p>
                    : <p>Are you sure you want to end this workout?</p>
                }
                {/* <p className="mb-2">You can always edit the workout later via the history page.</p> */}
                {workoutExerciseIds.length <= 0 ? <>
                    <button className="btn-primary w-full" onClick={discardWorkout}><FontAwesomeIcon icon={faTrash} className="mr-2" />Discard workout</button>
                    <button className="btn-danger w-full" onClick={endworkout}><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />Save anyway</button>
                </> : (
                    <button className="btn-primary w-full" onClick={endworkout}><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />End workout</button>
                )}
                <button className="btn-secondary w-full" onClick={() => setIsEndingModalOpen(false)}>Keep going</button>
            </Modal>
        </Page>
    )
}