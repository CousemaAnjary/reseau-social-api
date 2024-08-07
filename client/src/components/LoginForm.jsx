import { useState } from "react"
import { z } from "zod"
import useAuth from '../hooks/useAuth'
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"


// Définir le schéma de validation avec Zod
const formSchema = z.object({
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
})

export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // const handleLogin = (data) => {
    //     console.log(data)
    // }
    const handleLogin = async (data) => {
        // Données à envoyer au serveur (API) pour l'authentification
        const dataLogin = {
            email: data.email,
            password: data.password
        }

        try {
            await login(dataLogin)
            // Authentification réussie, rediriger vers le tableau de bord
            navigate('/friendzy')

        } catch (error) {
            // Afficher l'erreur dans la console
            console.error(error)
        }
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="p-8 max-w-lg w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl mb-4 font-serif">Connexion</h1>
            <p className="mb-4 text-md text-muted-foreground text-black">
                Faites partie de la communauté FriendZy, où vous pourrez rencontrer et discuter avec de nouveaux amis et partager des intérêts communs !
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
                Vous n'avez pas de compte ? Inscrivez-vous en cliquant <Link to="/register" className="underline text-cyan-700">ici</Link>
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Numéro mobile ou e-mail" className="shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-10 gap-2">
                            <div className="col-span-9">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input {...field} type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" className="shadow-sm" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                <Button type="button" variant="outline" className="mt-8 p-2 shadow-sm" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-cyan-700">Authentifier</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
