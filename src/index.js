import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// React Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router Dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Error Element</div>,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/task-details/:id",
    element: <TaskDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

