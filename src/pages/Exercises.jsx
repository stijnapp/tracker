import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Card from "../components/Card";
import Exercise from "../components/Exercises/Exercise";
import Input from "../components/Form/Input";
import Page from "../components/Page";
import { db } from "../helpers/db";
import { sanitizeString } from "../helpers/stringManipulation";

export default function Exercises() {
    const [exercises, setExercises] = useState(db.getAllExercises())
    const [search, setSearch] = useState('')

    const filteredExercises = exercises.filter((exercise) =>
        sanitizeString(exercise.name, true).includes(sanitizeString(search, true)) ||
        sanitizeString(exercise.nickname, true).includes(sanitizeString(search, true)
        ))

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleExerciseUpdate = (newExercise) => {
        db.updateExercise(newExercise.id, newExercise)
        setExercises(db.getAllExercises())
    }

    const handleExerciseAdd = () => {
        db.addExercise(sanitizeString(search))
        setExercises(db.getAllExercises())
    }

    return (
        <Page title="Exercises">
            <Card title={<>Search <FontAwesomeIcon icon={faSearch} className="w-4 h-4" /></>} className="flex flex-col gap-4">
                <Input type="text" value={search} onChange={handleSearchChange} label="Search by (nick)name" className="flex-grow mt-1" />
            </Card>

            {exercises.map((exercise) => (
                <AnimateInOut key={exercise.id}>
                    {filteredExercises.some((filteredExercise) => filteredExercise.id === exercise.id) && (
                        <Exercise exercise={exercises.find((filteredExercise) => filteredExercise.id === exercise.id)} onUpdate={handleExerciseUpdate} />
                    )}
                </AnimateInOut>
            ))}

            <AnimateInOut>
                {filteredExercises.length <= 0 && (
                    <Card title={<>&quot;<span className="normal-case">{sanitizeString(search)}</span>&quot; not found</>} className="flex flex-col gap-4">
                        <button className="btn-primary" onClick={handleExerciseAdd}>Add &quot;{search}&quot; as new exercise</button>
                    </Card>
                )}
            </AnimateInOut>
        </Page>
    )
}