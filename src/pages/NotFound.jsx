import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-primary">404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn-primary">Back to home</Link>
        </section>
    )
}