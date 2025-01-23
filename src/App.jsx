import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import Exercises from './pages/Exercises';
import History from './pages/History';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import Workout from './pages/Workout';

export default function App() {
    useLocalStorage('theme', 'system')

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 min-h-dvh max-w-[384px] mx-auto overflow-x-hidden px-4 pt-8 pb-40 bg-body-light dark:bg-body-dark text-dark dark:text-light transition-[background] duration-300">
                <Routes>
                    <Route path="/" element={<History />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}
