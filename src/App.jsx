import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import MovieList from "./pages/MovieList";
import CollectionList from "./pages/CollectionList";
import { loader as MoviesLoader } from "./pages/MovieList";
import Error from "./ui/Error";
import SeriesList from "./pages/SeriesList";
import { loader as SeriesLoader } from "./pages/SeriesList";
import { loader as CollectionLoader } from "./pages/CollectionList";
import CollectionOverview from "./pages/CollectionOverview";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { pb } from "./pb/database";

import { loader as collectionOverviewLoader } from "./pages/CollectionOverview";

import PageNotFound from "./ui/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignedIn } from "./slices/authSlice";
import { useEffect } from "react";



function App() {
  const isSignedIn = useSelector(store=>store.auth.isSignedIn)
  const dispatch = useDispatch()

  const currentSession = JSON.parse(localStorage.getItem("pocketbase_auth"));

  

  useEffect(function(){
    if(currentSession){
      dispatch(setIsSignedIn(pb.authStore.token === currentSession.token))
    }
  },[currentSession,dispatch])


  
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/movie/:page/:query?/",
          element: <MovieList />,
          loader: MoviesLoader,
          errorElement: <Error />,
        },
        {
          path: "/tv/:page/:query?/",
          element: <SeriesList />,
          loader: SeriesLoader,
          errorElement: <Error />,
        },
        {
          element: <ProtectedRoute isSignedIn={isSignedIn} />,
          children: [
            {
              path: "/collections",
              element: <CollectionList />,
              loader: CollectionLoader,
              errorElement: <Error />,
            },
            {
              path: "/collections/:id",
              element: <CollectionOverview />,
              errorElement: <Error />,
              loader: collectionOverviewLoader,
            },

          ],
        },
        
        {
          path: "/signup",
          element: <Signup />,
          errorElement: <Error />,
        },
        {
          path: "/signin",
          element: <Signin />,
          errorElement: <Error />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);


  

  return <RouterProvider router={router} />;
}

export default App;
