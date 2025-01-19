import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

/**
 * @param {object{ to: string, icon: IconProp, text: string }} props 
 */
export default function NavButton({ to, icon, text }) {
    const navButtonClasses = 'flex flex-col basis-full gap-1 text-center justify-center text-sm pb-1 pt-3 transition-all duration-200';

    return (
        <NavLink to={to} className={({ isActive }) => `${navButtonClasses} ${isActive ? 'text-primary -translate-y-1 font-bold drop-shadow-lg' : 'text-gray-500 font-medium'}`}>
            <FontAwesomeIcon icon={icon} size="xl" />
            {text}
        </NavLink>
    )
}