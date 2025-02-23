import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimateInOut from '../AnimateInOut'
import Input from './Input'

export default function Search({ label, search, setSearch }) {
    return (
        <div className="flex gap-2 mt-1">
            <Input type="text" inputMode="search" label={label} value={search} onChange={(e) => setSearch(e.target.value)} className="flex-grow" />
            <AnimateInOut direction="horizontal" className="flex" hiddenClassName="-ml-2">
                {search && <button onClick={() => setSearch('')} className="btn-secondary" aria-label="Clear search"><FontAwesomeIcon icon={faXmark} /></button>}
            </AnimateInOut>
        </div>
    )
}