import {createBrowserRouter,Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import App from "./App";
import Login from "./pages/Auth/login";
import CreatePost from "./pages/Admin/CreatePost";
import Contact from "./pages/Contact/contact";
import About from "./pages/About/about";
import ManageTrips from "./pages/Admin/ManageTrips";
import UpdateTrip from "./pages/Admin/UpdateTrip";
import Details from "./pages/Details/Details";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ViewBookings from "./pages/Admin/ViewBookings";


export const routes = createBrowserRouter([
    {
        path:"",
        element:<App/>,
        children: 
        [
            {
                path: "/",
                element: <Home/>,
            },
            

            {
                element:<Guest/>,
                children:[ {
                    path: "/Register",
                    element: <Register/>,
                },
                {
                    path: "/Login",
                    element: <Login/>,
                },]
            },
            {
                element:<Admin/>,
                children:[ 

                    {
                        path: "/post",
                        element: <CreatePost/>,
                    },
                    {
                        path: "/managebookings",
                        element: <ViewBookings/>,
                    },
                    {
                        path: "/managetrips",
                        children:[
                            {
                            path:"",                
                            element: <ManageTrips/>,
                            },
        
                            {
                                path: "update/:id",
                                element: <UpdateTrip/>,
                            },
                        ]
        
                    },

                ]
            },
            {
                path: "/details",
                element: <Details/>,
            },

            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/about",
                element: <About/>,
            },            
            
        ],
    },
    {
        path:"*",
        element:<Navigate to={"/"}/>,
    },

  ]);