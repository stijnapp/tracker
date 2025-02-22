import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * A spinner icon to indicate loading
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the spinner
 * @returns {JSX.Element} The spinner icon
 */
export default function Spinner({ className = "" }) {
    return (
        <FontAwesomeIcon icon={faSpinner} spin className={className} />
    )
}