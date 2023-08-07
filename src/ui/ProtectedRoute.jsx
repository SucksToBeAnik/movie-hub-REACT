import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({isSignedIn}) {
    if(!isSignedIn) return <Navigate to='/signin' />
    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute
