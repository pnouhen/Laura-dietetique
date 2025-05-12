import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home"
import ConsultationTarifs from "./pages/ConsultationTarifs/ConsultationTarifs";
import Recipes from "./pages/Recipes/Recipes";
import RecipesDetails from "./pages/RecipesDetails/RecipesDetails"
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
  },{
    path: "/recettes",
    element: (
        <Recipes />
    ),
  },
  {
    path: "/recettes/:id",
    element: (
        <RecipesDetails />
    ),
  },
  {
    path: "/se-connecter",
    element: (
        <Connexion />
    ),
  }  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
