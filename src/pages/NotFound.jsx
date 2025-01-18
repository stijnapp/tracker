import { Link } from "react-router-dom";
import Page from "../components/Page";

export default function NotFound() {
    return (
        <Page>
            <div className="flex flex-col gap-4 items-center text-center">
                <h1 className="text-7xl tracking-tight font-extrabold text-primary">404</h1>
                <p className="text-3xl tracking-tight font-bold text-gray-900">Something&apos;s missing</p>
                <p>Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page</p>
                <Link to="/" className="btn-primary">Back to home</Link>
            </div>
        </Page>
    )
}