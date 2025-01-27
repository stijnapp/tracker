import { faChartLine, faClockRotateLeft, faDumbbell, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import NavButton from "./NavButton";

/**
 * @returns {JSX.Element}
 */
export default function Navbar() {
    /**
     * @type {Array<{ to: string, icon: IconProp, text: string }>}
     */
    const navItems = [
        { to: '/', icon: faClockRotateLeft, text: 'History' },
        { to: '/stats', icon: faChartLine, text: 'Stats' },
        { to: '/workout', icon: faPlus, text: 'Workout' },
        { to: '/exercises', icon: faDumbbell, text: 'Exercises' },
        { to: '/settings', icon: faGear, text: 'Settings' },
    ];

    return (
        <div className="fixed z-10 bottom-0 w-full bg-floating-light/90 dark:bg-floating-dark/90 backdrop-blur border-t border-gray-300 dark:border-white/20 theme-transition">
            <nav className="max-w-[384px] mx-auto px-4">
                <ul className="flex flex-row justify-between">
                    {navItems.map((item) => (
                        <li key={item.to} className="basis-full">
                            <NavButton {...item} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}