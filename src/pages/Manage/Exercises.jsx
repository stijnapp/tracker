import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import AnimateInOut from '../../components/AnimateInOut'
import Card from '../../components/Card'
import Exercise from '../../components/Exercises/Exercise'
import Search from '../../components/Form/Search'
import Modal from '../../components/Modal'
import { db } from '../../helpers/db'
import { sanitizeString } from '../../helpers/stringManipulation'

export default function Exercises() {
    const [exercises, setExercises] = useState(db.getAllExercises())
    const [search, setSearch] = useState('')
    const [deleteId, setDeleteId] = useState(null)
    const usageAmount = db.getExerciseUsageAmount(deleteId)

    const filteredExercises = exercises.filter((exercise) =>
        sanitizeString(exercise.name, true).includes(sanitizeString(search, true)) ||
        sanitizeString(exercise.nickname, true).includes(sanitizeString(search, true)
        ))

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
        <>
            <Card title={<>Search <FontAwesomeIcon icon={faSearch} className="w-4 h-4" /></>}>
                <Search label="Exercise name" search={search} setSearch={setSearch} />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Showing {filteredExercises.length} of {exercises.length} exercises</p>
            </Card>

            {exercises.map((exercise) => (
                <AnimateInOut key={exercise.id} className='rounded-lg' hiddenClassName="-mt-4" disableOverflowSpace>
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
        </>
    )
}