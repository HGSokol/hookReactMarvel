import ComicsList from "../comicsList/ComicsList.js";
import AppBanner from "../appBanner/AppBanner.js";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.js";


const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;