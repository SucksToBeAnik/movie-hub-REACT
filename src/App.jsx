import { createBrowserRouter,RouterProvider } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Homepage from "./pages/Homepage"
import MovieList from "./pages/MovieList"
import CollectionList from "./pages/CollectionList"
import ReviewList from "./pages/ReviewList"
import {loader as MoviesLoader} from './pages/MovieList'
import Error from "./ui/Error"
import SeriesList from "./pages/SeriesList"
import {loader as SeriesLoader} from './pages/SeriesList'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path:'/',
        element: <Homepage />,
      },
      {
        path:'/movie/:query?',
        element:<MovieList />,
        loader:MoviesLoader,
        errorElement: <Error />
      },
      {
        path:'/tv/:query?',
        element:<SeriesList />,
        loader:SeriesLoader,
        errorElement: <Error />
      },
      {
        path:'/collections',
        element:<CollectionList />,
      },
      {
        path:'/reviews',
        element: <ReviewList />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
