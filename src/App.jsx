import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home"
import ConsultationTarifs from "./pages/ConsultationTarifs/ConsultationTarifs";
import Recipes from "./pages/Recipes/Recipes";
import Connexion from "./pages/Connexion";
import About from "./pages/About/About";
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
