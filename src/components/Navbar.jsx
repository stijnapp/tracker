import { faChartLine, faClockRotateLeft, faDumbbell, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const navItemClasses = ({ isActive }) => `flex flex-col gap-1 items-center justify-center text-sm font-medium pb-1 pt-3 transition-all duration-200 ${isActive ? 'text-primary -translate-y-1' : 'text-gray-500'}`;

export default function Navbar() {
    return (
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-300">
            <nav className="max-w-[384px] mx-auto px-4 grid grid-cols-5">
                <NavLink to="/" className={navItemClasses}>
                    <FontAwesomeIcon icon={faClockRotateLeft} size="xl" />
                    History
                </NavLink>
                <NavLink to="/stats" className={navItemClasses}>
                    <FontAwesomeIcon icon={faChartLine} size="xl" />
                    Stats
                </NavLink>
                <NavLink to="/workout" className={navItemClasses}>
                    <FontAwesomeIcon icon={faPlus} size="xl" />
                    Workout
                </NavLink>
                <NavLink to="/exercises" className={navItemClasses}>
                    <FontAwesomeIcon icon={faDumbbell} size="xl" />
                    Exercises
                </NavLink>
                <NavLink to="/settings" className={navItemClasses}>
                    <FontAwesomeIcon icon={faGear} size="xl" />
                    Settings
                </NavLink>
            </nav>
        </div>
    )
}