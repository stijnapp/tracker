import { NavLink, Outlet } from 'react-router-dom'
import Page from '../../components/Page'

export default function Manage() {
    const tabItems = [
        { to: '/manage', text: 'Exercises' },
        { to: '/manage/tags', text: 'Tags' },
    ]

    return (
        <Page title="Manage">
            <div className="border-b border-gray-500/50 text-gray-500 dark:text-gray-400 font-medium">
                <ul className="flex flex-wrap gap-2 -mb-px">
                    {tabItems.map((item) => (
                        <li key={item.to}>
                            <NavLink to={item.to} end className={({ isActive }) => `inline-block p-3 border-b-2 ${isActive ? 'text-primary border-primary dark:text-primary dark:border-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>{item.text}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <Outlet />
        </Page>
    )
}