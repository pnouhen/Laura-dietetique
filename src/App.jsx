import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home"
import ConsultationTarifs from "./pages/ConsultationTarifs/ConsultationTarifs";
import Recipes from "./pages/Recipes/Recipes";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails"
import AuthPage from "./pages/AuthPage/AuthPage";
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
    path: "/consultations-et-tarifs",
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
        <RecipeDetails />
    ),
  },
  {
    path: "/se-connecter",
    element: (
        <AuthPage />
    ),
  }  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
