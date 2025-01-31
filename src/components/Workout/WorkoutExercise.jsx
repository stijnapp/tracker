import { useState } from "react";
import { db } from "../../helpers/db";
import Collapse from "../Collapse";
import Textarea from "../Form/Textarea";

export default function WorkoutExercise({ workoutId, workoutExerciseId, newestExercise = false }) {
    const [exerciseId] = useState(db.getWorkoutExerciseById(workoutId, workoutExerciseId).exerciseId)
    const [exercise, setExercise] = useState(db.getExerciseById(exerciseId))

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value
        db.updateExercise(exerciseId, { ...exercise, description: newDescription })
        setExercise(db.getExerciseById(exerciseId))
    }

    const cardHeader = (
        <div>
            {exercise.name}
            {exercise.nickname && <p className="text-base font-normal -mt-0.5 text-gray-500 dark:text-gray-400">{exercise.nickname}</p>}
        </div>
    )

    return (
        <Collapse title={cardHeader} openByDefault={newestExercise}>
            <Textarea label="Description" value={exercise.description ?? ''} onChange={handleDescriptionChange} />

            {/* <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Set</th>
                        <th className="p-2">Weight</th>
                        <th className="p-2">Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {exercise.sets.map((set) => (
                        <tr key={set.id} className="border-b border-gray-500/50">
                            <td className="p-2">{set.id}</td>
                            <td className="p-2">
                                <Input type="number" value={set.weight} onChange={() => { }} />
                            </td>
                            <td className="p-2">
                                <Input type="number" value={set.weight} onChange={() => { }} />
                            </td>
                        </tr>
                    ))}
                    <tr className="opacity-50">
                        <td className="p-2">{exercise.sets.length + 1}</td>
                        <td className="p-2">
                            <Input type="number" value={''} onChange={() => { }} />
                        </td>
                        <td className="p-2">
                            <Input type="number" value={''} onChange={() => { }} />
                        </td>
                    </tr>
                </tbody>
            </table> */}
        </Collapse>
    )
}