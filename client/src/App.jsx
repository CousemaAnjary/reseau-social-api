
import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/routes/PrivateRoute"
import PublicRoute from "./components/routes/PublicRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import DashboardClient from "./pages/DashboardClient"
import { UserProvider } from "./contexts/UserContext"
import Profil from "./pages/Profil"
import InvitationClient from "./pages/InvitationClient"


export default function App() {
  /**
   * ! STATE (état, données) de l'application
   */


  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */



  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>


        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/friendzy" element={<DashboardClient />} />
          <Route path="/friendzy/profil" element={<Profil />} />
          <Route path="/friendzy/invitation" element={<InvitationClient />} />
          {/* <Route path="/friendzy/invitation/:id" element={<InvitationClient />} /> */}
          {/* fuck you ccccc */}
        </Route>


      </Routes>
    </UserProvider>

  )
}