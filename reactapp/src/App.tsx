import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import Header from "./components/Header";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WrapperComponent Component={Home} />,
    },
    {
        path: "/register",
        element: <WrapperComponent Component={Register} />,
    },
    {
        path: "/login",
        element: <WrapperComponent Component={Login} />,
    },
    {
        path: "/Chat",
        element: <WrapperComponent Component={Chat} />,
    },

]);

function WrapperComponent({ Component }: { Component: Function }) {
    return (
        <>
            <Header />
            <Component />
        </>
    );
}

function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
