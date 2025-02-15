import { useState } from 'react'
import { db } from '../helpers/db'
import Collapse from './Collapse'
import Input from './Form/Input'
import Modal from './Modal'

export default function Tag({ tag, onUpdate, onDelete }) {
    const usageAmount = db.getTagUsageAmount(tag.id)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const handleNameChange = (e) => {
        onUpdate({ ...tag, name: e.target.value })
    }

    const handleDelete = () => {
        onDelete(tag.id)
    }

    return (
        <>
            <Collapse title={tag.name} subtitle={tag.nickname} className="flex flex-col gap-4">
                <p>This tag is used by <strong>{usageAmount}</strong> exercise{usageAmount != 1 && 's'}</p>
                <Input label="Name" value={tag.name ?? ''} onChange={handleNameChange} />
                <button className="btn-danger" onClick={() => setDeleteModalOpen(true)}>Delete tag</button>
            </Collapse>

            <Modal showModal={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete tag">
                <p>Are you sure you want to delete this tag?</p>
                {usageAmount > 0 && <p>This will also remove all <strong className="text-danger">{usageAmount}</strong> usages of this tag.</p>}
                <p className="font-semibold text-danger">This action cannot be undone</p>
                <button className="btn-danger w-full" onClick={handleDelete}>Delete tag</button>
                <button className="btn-secondary w-full" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </Modal>
        </>
    )
}