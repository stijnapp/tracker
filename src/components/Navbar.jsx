import { faChartLine, faClockRotateLeft, faDumbbell, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

/**
 * @typedef {Object} NavItem
 * @property {string} to - The path to navigate to
 * @property {IconProp} icon - The icon to display
 * @property {string} text - The text to display
 */

/**
 * @returns {JSX.Element}
 */
export default function Navbar() {
    const navButtonClasses = 'flex flex-col gap-1 text-center justify-center text-sm pb-1 pt-3 transition-[transform,font-weight,filter] duration-200';
    const navItems = [
        { to: '/', icon: faClockRotateLeft, text: 'History' },
        { to: '/stats', icon: faChartLine, text: 'Stats' },
        { to: '/workout', icon: faPlus, text: 'Workout' },
        { to: '/exercises', icon: faDumbbell, text: 'Exercises' },
        { to: '/settings', icon: faGear, text: 'Settings' },
    ];

    return (
        <div className="fixed z-10 bottom-0 w-full bg-floating-light/85 dark:bg-floating-dark/85 backdrop-blur border-t border-gray-300 dark:border-white/20 theme-transition">
            <nav className="max-w-[384px] mx-auto px-4">
                <ul className="flex flex-row justify-between">
                    {navItems.map((item) => (
                        <li key={item.to} className="basis-full">
                            <NavLink to={item.to} className={({ isActive }) => `${navButtonClasses} ${isActive ? 'text-primary -translate-y-1 font-bold drop-shadow-[0_0px_8px_#1d809866]' : 'text-gray-500 dark:text-gray-400 font-medium'}`}>
                                <FontAwesomeIcon icon={item.icon} size="xl" />
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
