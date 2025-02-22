import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import AnimateInOut from '../../components/AnimateInOut'
import Card from '../../components/Card'
import Search from '../../components/Form/Search'
import Tag from '../../components/Manage/Tag'
import { db } from '../../helpers/db'
import { sanitizeString } from '../../helpers/stringManipulation'

export default function Tags() {
    const [tags, setTags] = useState(db.getAllTags())
    const [search, setSearch] = useState('')

    const filteredTags = tags.filter((tag) => sanitizeString(tag.name, true).includes(sanitizeString(search, true)))

    const handleTagAdd = () => {
        db.addTag(sanitizeString(search))
        setTags(db.getAllTags())
    }

    const handleTagUpdate = (newTag) => {
        db.updateTag(newTag.id, newTag)
        setTags(db.getAllTags())
    }

    const handleTagDelete = (tagId) => {
        db.deleteTag(tagId)
        setTags(db.getAllTags())
    }

    return (
        <>
            <Card title={<>Search tags <FontAwesomeIcon icon={faSearch} className="w-4 h-4" /></>}>
                <Search label="Tag name" search={search} setSearch={setSearch} />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Showing {filteredTags.length} of {tags.length} tags</p>
            </Card>

            {tags.map((tag) => (
                <AnimateInOut key={tag.id} className='rounded-lg' hiddenClassName="-mt-4" disableOverflowSpace>
                    {filteredTags.some((filteredTag) => filteredTag.id === tag.id) && (
                        <Tag tag={tags.find((filteredTag) => filteredTag.id === tag.id)} onUpdate={handleTagUpdate} onDelete={handleTagDelete} />
                    )}
                </AnimateInOut>
            ))}

            <AnimateInOut>
                {tags.length <= 0 && search.length <= 0 && (
                    <Card key={'empty'} title="No tags found">
                        <p className="mb-2">You have not created any tags yet.</p>
                        <p>Add one by typing in the search bar above.</p>
                    </Card>
                )}
            </AnimateInOut>

            <AnimateInOut>
                {(tags.length > 0 || search.length > 0) && filteredTags.length <= 0 && (
                    <Card title={<>&quot;<span className="normal-case">{sanitizeString(search)}</span>&quot; not found</>} className="flex flex-col gap-4">
                        <button className="btn-primary" onClick={handleTagAdd}>Add a new tag called &quot;{search}&quot;</button>
                    </Card>
                )}
            </AnimateInOut>
        </>
    )
}