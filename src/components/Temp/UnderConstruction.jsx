import { faHelmetSafety } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../Card";

export default function UnderConstruction() {
    return (
        <Card title={<span className="block text-center"><FontAwesomeIcon icon={faHelmetSafety} className="text-warning" /> Under construction <FontAwesomeIcon icon={faHelmetSafety} className="text-warning" /></span>}>
            <p className="text-center">This page is under construction. Check back later for updates.</p>
        </Card>
    )
}