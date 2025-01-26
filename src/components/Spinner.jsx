import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @param {{
 *  className?: string
 * }} args
 * @returns {JSX.Element}
 */
export default function Spinner({ className = "" }) {
    return (
        <FontAwesomeIcon icon={faSpinner} spin className={className} />
    )
}