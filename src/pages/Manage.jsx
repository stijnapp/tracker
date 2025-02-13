import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Card from "../components/Card";
import Exercise from "../components/Exercises/Exercise";
import Input from "../components/Form/Input";
import Modal from "../components/Modal";
import Page from "../components/Page";
import { db } from "../helpers/db";
import { sanitizeString } from "../helpers/stringManipulation";

export default function Manage() {
    const [exercises, setExercises] = useState(db.getAllExercises())
    const [search, setSearch] = useState('')
    const [deleteId, setDeleteId] = useState(null)
    const usageAmount = db.getExerciseUsageAmount(deleteId)

    const filteredExercises = exercises.filter((exercise) =>
        sanitizeString(exercise.name, true).includes(sanitizeString(search, true)) ||
        sanitizeString(exercise.nickname, true).includes(sanitizeString(search, true)
        ))

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleExerciseAdd = () => {
        db.addExercise(sanitizeString(search))
        setExercises(db.getAllExercises())
    }

    const handleExerciseUpdate = (newExercise) => {
        db.updateExercise(newExercise.id, newExercise)
        setExercises(db.getAllExercises())
    }

    const handleExerciseDelete = () => {
        db.deleteExercise(deleteId)
        setExercises(db.getAllExercises())
        setDeleteId(null)
    }

    return (
        <Page title="Manage">
            {/* TODO: tabs */}
            {/* <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Exercises</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Tags</a>
                    </li>
                </ul>
            </div> */}

            <Card title={<>Search <FontAwesomeIcon icon={faSearch} className="w-4 h-4" /></>}>
                <div className="flex gap-2 mt-1">
                    <Input type="text" inputMode="search" value={search} onChange={handleSearchChange} label="Exercise name" className="flex-grow" />
                    <AnimateInOut direction="horizontal" className="flex" hiddenClassName="-ml-2">
                        {search && <button onClick={() => setSearch('')} className="btn-secondary" aria-label="Clear search"><FontAwesomeIcon icon={faXmark} /></button>}
                    </AnimateInOut>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Showing {filteredExercises.length} of {exercises.length} exercises</p>
            </Card>

            {exercises.map((exercise) => (
                <AnimateInOut key={exercise.id} hiddenClassName="-mt-4">
                    {filteredExercises.some((filteredExercise) => filteredExercise.id === exercise.id) && (
                        <Exercise exercise={exercises.find((filteredExercise) => filteredExercise.id === exercise.id)} onUpdate={handleExerciseUpdate} onDelete={setDeleteId} />
                    )}
                </AnimateInOut>
            ))}

            <AnimateInOut>
                {exercises.length <= 0 && search.length <= 0 && (
                    <Card key={'empty'} title="No exercises found">
                        <p className="mb-2">You have not created any exercises yet.</p>
                        <p>Add one by typing in the search bar above.</p>
                    </Card>
                )}
            </AnimateInOut>

            <AnimateInOut restartOnChildKeyChange>
                {(exercises.length > 0 || search.length > 0) && filteredExercises.length <= 0 && (
                    <Card key={'not found'} title={<>&quot;<span className="normal-case">{sanitizeString(search)}</span>&quot; not found</>} className="flex flex-col gap-4">
                        <button className="btn-primary" onClick={handleExerciseAdd}>Add &quot;{search}&quot; as new exercise</button>
                    </Card>
                )}
            </AnimateInOut>

            <Modal showModal={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete exercise">
                <p>Are you sure you want to delete this exercise?</p>
                {usageAmount > 0 && <p>This will also remove all <strong className="text-danger">{usageAmount}</strong> usages of this exercise.</p>}
                <p className="font-semibold text-danger">This action cannot be undone</p>
                <button className="btn-danger w-full" onClick={handleExerciseDelete}>Delete exercise</button>
                <button className="btn-secondary w-full" onClick={() => setDeleteId(null)}>Cancel</button>
            </Modal>
        </Page>
    )
}