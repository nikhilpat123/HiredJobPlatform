import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./components/layouts/app-layout";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";

import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
import PostJob from "./pages/post-job";
import JobListing from "./pages/job-listing";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-job";
import JobPage from "./pages/job";


const router =createBrowserRouter([
  {
      element:<AppLayout/>,        //element: means what is going to be rendering inside my app -- and PPLayout me hum apni poori app wrap krenge
      children:[
        {
               path:'/',               //inside out children hum sare routes banayege jo ki humare Applayput pe ayenge
               element:<LandingPage/> 
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          ),
        },
        {
          path: "/post-job",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  
  function App() {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    );
  }
  
  export default App;  