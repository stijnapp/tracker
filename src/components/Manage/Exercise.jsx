import { useState } from 'react'
import { db } from '../../helpers/db'
import Collapse from '../Collapse'
import Input from '../Form/Input'
import Select from '../Form/Select'
import Textarea from '../Form/Textarea'

export default function Exercise({ exercise, onUpdate, onDelete }) {
    const [tags] = useState(db.getAllTags)
    const tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }))
    const usageAmount = db.getExerciseUsageAmount(exercise.id)

    const handleNameChange = (e) => {
        onUpdate({ ...exercise, name: e.target.value })
    }

    const handleNicknameChange = (e) => {
        onUpdate({ ...exercise, nickname: e.target.value })
    }

    const handleDescriptionChange = (e) => {
        onUpdate({ ...exercise, description: e.target.value })
    }

    const handleTagChange = (e) => {
        onUpdate({ ...exercise, tagId: e.target.value })
    }

    const handleDelete = () => {
        onDelete(exercise.id)
    }

    return (
        <Collapse title={exercise.name} subtitle={exercise.nickname} className="flex flex-col gap-4">
            <p>You have performed this exercise <strong>{usageAmount}</strong> time{usageAmount != 1 && 's'}</p>
            <Input label="Name" value={exercise.name ?? ''} onChange={handleNameChange} />
            <Input label="Nickname" value={exercise.nickname ?? ''} onChange={handleNicknameChange} />
            <Textarea label="Description" value={exercise.description ?? ''} onChange={handleDescriptionChange} />
            {/* TODO: use search variant once implemented */}
            <Select label="Tag" options={tagOptions} value={exercise.tagId} onChange={handleTagChange} />
            <button className="btn-danger" onClick={handleDelete}>Delete exercise</button>
        </Collapse>
    )
}