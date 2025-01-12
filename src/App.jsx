import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="min-h-dvh max-w-[384px] mx-auto px-4 pt-8 pb-40 bg-gray-100 text-dark flex flex-col gap-4">
                <Routes>
                    <Route path="/" element={<div>History</div>} />
                    <Route path="/stats" element={<div>Stats</div>} />
                    <Route path="/workout" element={<div>Workout</div>} />
                    <Route path="/exercises" element={<div>Exercises</div>} />
                    <Route path="/settings" element={<div>Settings</div>} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </main>
        </>

    )
}
