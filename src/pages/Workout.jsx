import { useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Page from "../components/Page";
import ActiveWorkoutInfo from "../components/Workout/ActiveWorkoutInfo";
import WorkoutExercise from "../components/Workout/WorkoutExercise";
import { db } from "../helpers/db";

export default function Workout() {
    const [activeWorkoutId, setActiveWorkoutId] = useState(db.getActiveWorkoutId())
    const [workoutExerciseIds, setWorkoutExerciseIds] = useState(db.getWorkoutExerciseIds(activeWorkoutId))

    const startNewWorkout = () => {
        const newWorkoutId = db.addWorkout().id
        setActiveWorkoutId(newWorkoutId)
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(newWorkoutId))
    }

    const endworkout = () => {
        // TODO: does something else need saving?
        db.setActiveWorkoutId(null)
        setActiveWorkoutId(null)
    }

    return (
        <Page title="Workout" className="gap-0">
            <AnimateInOut className="w-full flex flex-col gap-4">
                {!activeWorkoutId && <button className="btn-primary" onClick={startNewWorkout}>Start workout</button>}
            </AnimateInOut>

            <AnimateInOut className="w-full flex flex-col gap-4">
                {activeWorkoutId && (
                    <>
                        <ActiveWorkoutInfo activeWorkoutId={activeWorkoutId} />

                        {workoutExerciseIds.map((exerciseId) => (
                            <WorkoutExercise key={exerciseId} workoutId={activeWorkoutId} workoutExerciseId={exerciseId} />
                        ))}

                        <button className="btn-primary">Add exercise</button>
                        <button className="btn-danger" onClick={endworkout}>End workout</button>
                    </>
                )}
            </AnimateInOut>
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