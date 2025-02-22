import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import useEventListener from './hooks/useEventListener'
import useTheme from './hooks/useTheme'
import History from './pages/History'
import Exercises from './pages/Manage/Exercises'
import Manage from './pages/Manage/Manage'
import Tags from './pages/Manage/Tags'
import NotFound from './pages/NotFound'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import Workout from './pages/Workout'

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
            <div className='text-dark dark:text-light bg-body-light dark:bg-body-dark theme-transition'>
                <div className="flex flex-col gap-4 min-h-dvh max-w-[384px] mx-auto overflow-x-hidden px-4 break-words">
                    <Routes>
                        <Route path="/" element={<History />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/workout" element={<Workout />} />
                        <Route path="/manage" element={<Manage />}>
                            <Route index element={<Exercises />} />
                            <Route path="tags" element={<Tags />} />
                        </Route>
                        <Route path="/settings" element={<Settings deferredPrompt={deferredPrompt} />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}
