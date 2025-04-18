import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home"
import ConsultationTarifs from "./components/pages/ConsultationTarifs";
import Recipes from "./components/pages/Recipes";
import Connexion from "./components/pages/Connexion";
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
    path: "/consultations-et-tarif",
    element: (
        <ConsultationTarifs />
    ),
  },
  {
    path: "/se-connecter",
    element: (
        <Connexion />
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
