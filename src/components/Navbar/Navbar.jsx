import { faChartLine, faClockRotateLeft, faDumbbell, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import NavButton from "./NavButton";

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
        <div className="fixed bottom-0 w-full bg-floating-light dark:bg-floating-dark border-t border-gray-300 dark:border-white/20">
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