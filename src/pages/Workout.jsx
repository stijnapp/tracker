import { faFlagCheckered, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Input from "../components/Form/Input";
import Modal from "../components/Modal";
import Page from "../components/Page";
import ActiveWorkoutInfo from "../components/Workout/ActiveWorkoutInfo";
import WorkoutExercise from "../components/Workout/WorkoutExercise";
import { db } from "../helpers/db";

export default function Workout() {
    const [activeWorkoutId, setActiveWorkoutId] = useState(db.getActiveWorkoutId())
    const [workoutExerciseIds, setWorkoutExerciseIds] = useState(db.getWorkoutExerciseIds(activeWorkoutId))
    const [isEndingModalOpen, setIsEndingModalOpen] = useState(false)
    const [isAddingExerciseModalOpen, setIsAddingExerciseModalOpen] = useState(false)
    const [exercises] = useState(db.getAllExercises())
    const justAddedExercise = useRef(false)

    const startNewWorkout = () => {
        const newWorkoutId = db.addWorkout().id
        setActiveWorkoutId(newWorkoutId)
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(newWorkoutId))
    }

    const addExercise = (exerciseId) => {
        db.addWorkoutExercise(activeWorkoutId, exerciseId)
        refreshWorkoutExercises()
        setIsAddingExerciseModalOpen(false)
        // TODO: collapse (now second to) last exercise
    }

    const endworkout = () => {
        // TODO: does something else need saving?
        db.endActiveWorkout()
        setActiveWorkoutId(null)
        refreshWorkoutExercises()
        setIsEndingModalOpen(false)
        // TODO: global success alert "Workout saved successfully" or "Workout ended"
    }

    const refreshWorkoutExercises = () => {
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(activeWorkoutId))
    }

    return (
        <Page title="Workout">
            <AnimateInOut className="flex flex-col gap-4" hiddenClassName="-mt-4">
                {!activeWorkoutId && <button className="btn-primary" onClick={startNewWorkout}>Start workout</button>}
            </AnimateInOut>

            <AnimateInOut className="flex flex-col gap-4 mb-40">
                {activeWorkoutId && (
                    <>
                        <ActiveWorkoutInfo activeWorkoutId={activeWorkoutId} />

                        {workoutExerciseIds.map((exerciseId) => {
                            const isLastExercise = exerciseId === workoutExerciseIds[workoutExerciseIds.length - 1]
                            const isSecondToLastExercise = exerciseId === workoutExerciseIds[workoutExerciseIds.length - 2]
                            const openByDefault = (isLastExercise) || (justAddedExercise.current && isSecondToLastExercise)

                            if (isLastExercise) justAddedExercise.current = false

                            return (
                                <WorkoutExercise key={exerciseId} workoutId={activeWorkoutId} workoutExerciseId={exerciseId} onDelete={refreshWorkoutExercises} openByDefault={openByDefault} />
                            )
                        })}

                        <button className="btn-primary" onClick={() => setIsAddingExerciseModalOpen(true)}><FontAwesomeIcon icon={faPlus} className="mr-2" />Add exercise</button>
                        <button className="btn-danger" onClick={() => setIsEndingModalOpen(true)}><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />End workout</button>
                    </>
                )}
            </AnimateInOut>

            <Modal showModal={isAddingExerciseModalOpen} onClose={() => setIsAddingExerciseModalOpen(false)} title="Add exercise">
                <Input type="text" label="Search for exercise" />
                <div className="flex flex-col gap-2">
                    {exercises.map((exercise) => (
                        <button key={exercise.id} onClick={() => addExercise(exercise.id)} className="btn-primary flex-grow">{exercise.name}</button>
                    ))}
                </div>
                <button className="btn-secondary w-full" onClick={() => setIsAddingExerciseModalOpen(false)}>Cancel</button>
            </Modal>

            <Modal showModal={isEndingModalOpen} onClose={() => setIsEndingModalOpen(false)} title="End workout">
                <p>Are you sure you want to end this workout?</p>
                <p className="mb-2">You can always edit the workout later via the history page.</p>
                <button className="btn-danger w-full" onClick={endworkout}>End workout</button>
                <button className="btn-secondary w-full" onClick={() => setIsEndingModalOpen(false)}>Keep going</button>
            </Modal>
        </Page>
    )
}