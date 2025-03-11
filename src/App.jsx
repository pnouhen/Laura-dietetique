import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home"
import About from "./components/pages/About";
import MethodRate from "./components/pages/MethodRate";
import Contact from "./components/pages/Contact";
import Recipes from "./components/pages/Recipes";
import Account from "./components/pages/Account";
import "./styles/general.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/qui-suis-je",
    element: (
      <div>
        <About />
      </div>
    ),
  },
  {
    path: "/methode-et-tarif",
    element: (
      <div>
        <MethodRate />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div>
        <Contact />
      </div>
    ),
  },
  {
    path: "/recettes",
    element: (
      <div>
        <Recipes />
      </div>
    ),
  },
  {
    path: "/mon-compte",
    element: (
      <div>
        <Account />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
