import {createBrowserRouter,Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import App from "./App";
import Login from "./pages/Auth/login";
import CreatePost from "./pages/Admin/CreatePost";
import Contact from "./pages/Contact/contact";
import About from "./pages/About/about";
import Details from "./pages/Details/Details";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ViewBookings from "./pages/Admin/ViewBookings";
import Manageusers from "./pages/Admin/Manageusers";
import UpdateUser from "./pages/Admin/UpdateUser";
import Manageposts from "./pages/Admin/Manageposts";
import UpdatePost from "./pages/Admin/UpdatePost";
import SubmitForm from "./pages/SubmitForm/SubmitForm";
import UserHistory from "./pages/Admin/UserHistory";
import ManageForms from "./pages/Admin/ManageForms";


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
                },

            ]
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
                        path: "/manageusers",
                        children:[
                            {
                            path:"",                
                            element: <Manageusers/>,
                            },
        
                            {
                                path: "updateuser/:id",
                                element: <UpdateUser/>,
                            },
                            {
                                path: "showhistory/:id",
                                element: <UserHistory/>,
                            },
                        ]
        
                    },
                    {
                        path: "/manageposts",
                        children:[
                            {
                            path:"",                
                            element: <Manageposts/>,
                            },
        
                            {
                                path: "updatepost/:id",
                                element: <UpdatePost/>,
                            },
                        ]
        
                    },
                    {
                        path: "/manageforms",
                        element: <ManageForms/>,
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
            {
                path: "/submitform",
                element: <SubmitForm/>,
            },
        ],
    },
    {
        path:"*",
        element:<Navigate to={"/"}/>,
    },

  ]);