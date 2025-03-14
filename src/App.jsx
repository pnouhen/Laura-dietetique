import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home"
import MethodRate from "./components/pages/MethodRate";
import Contact from "./components/pages/Contact";
import Recipes from "./components/pages/Recipes";
import Account from "./components/pages/Account";
import "./styles/general.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Home />
    ),
  },
  {
    path: "/methode-et-tarif",
    element: (
        <MethodRate />
    ),
  },
  {
    path: "/contact",
    element: (
        <Contact />
    ),
  },
  {
    path: "/recettes",
    element: (
        <Recipes />
    ),
  },
  {
    path: "/mon-compte",
    element: (
        <Account />
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
