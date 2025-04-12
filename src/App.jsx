import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home"
import MethodRate from "./components/pages/MethodRate";
import Recipes from "./components/pages/Recipes";
import About from "./components/pages/About";
import "./styles/general.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Home />
    ),
  },
  {
    path: "/qui-suis-je",
    element: (
        <About />
    ),
  },
  {
    path: "/methode-et-tarif",
    element: (
        <MethodRate />
    ),
  },
  {
    path: "/recettes",
    element: (
        <Recipes />
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
