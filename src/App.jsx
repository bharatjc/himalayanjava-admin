import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard'
import AddServices from './Pages/AddServices'
import CustomerInfo from './Pages/CustomerInfo'
import AddMenu from './Pages/AddMenu'
import AddNewOutlets from './Pages/AddNewOutlets'
import UpdateProfile from './Pages/UpdateProfile'
import Income from './Pages/Income'
import Help from './Pages/Help'
import ResetPassword from './Pages/ResetPassword'
import ForgotPassword from './Pages/ForgotPassword'
import Contact from './Pages/Contact';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "signup",
      element: <SignUp/>,
    },
    {
      path: "resetpassword/:id/:token",
      element: <ResetPassword/>,
    },
    {
      path: "forgotpassword",
      element: <ForgotPassword/>,
    },
    {
      path: "home",
      element: <Home/>,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "addservices",
          element: <AddServices />,
        },
        {
          path: "customerinfo",
          element: <CustomerInfo />,
        },
        {
          path: "addmenu",
          element: <AddMenu />,
        },
        {
          path: "addnewoutlets",
          element: <AddNewOutlets />,
        },
        {
          path: "updateprofile",
          element: <UpdateProfile />,
        },
        {
          path: "income",
          element: <Income />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ]
    },
  ]);
  return (
    <div className='bg-rose-100'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
