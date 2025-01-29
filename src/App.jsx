import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import useEventListener from './hooks/useEventListener';
import useTheme from './hooks/useTheme';
import Exercises from './pages/Exercises';
import History from './pages/History';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import Workout from './pages/Workout';

export default function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    useTheme()
    useEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        setDeferredPrompt(e)
    })

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 min-h-dvh max-w-[384px] mx-auto overflow-x-hidden px-4 bg-body-light dark:bg-body-dark text-dark dark:text-light theme-transition">
                <Routes>
                    <Route path="/" element={<History />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/settings" element={<Settings deferredPrompt={deferredPrompt} />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}
