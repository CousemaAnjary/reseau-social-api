import { Link } from "react-router-dom"
import logo from '../assets/images/logo.png'
import Navbar from "../components/NavbarHome"
import { Button } from "../components/ui/button"


export default function Home() {
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
        <>
            <div className="relative h-screen w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                <Navbar />
                <div className="flex flex-col items-center justify-center mt-36 text-center relative z-10">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl font-serif max-w-3xl">
                        Découvrez de nouveaux amis avec <span><img src={logo} alt="logo" className="w-64 h-auto object-contain inline-block" /></span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        Rejoignez notre communauté pour rencontrer de nouvelles personnes, partager des moments et explorer des intérêts communs.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to="/login">
                            <Button className="bg-cyan-700">Accèdez maintenant</Button>
                        </Link>

                        <Link to="/register">
                            <Button variant="outline">Créer un compte</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}