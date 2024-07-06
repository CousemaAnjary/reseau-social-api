import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, logout as logoutService, } from '../services/authService';
import { isAuthenticated, removeToken } from '../utils/auth';
import useUser from '../hooks/useUser';


export default function useAuth() {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const { user, setUser } = useUser()

    const [auth, setAuth] = useState(isAuthenticated())

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        // Vérifier si l'utilisateur est authentifié
        if (auth) {
            // Charger les informations de l'utilisateur depuis le stockage local
            setUser({
                id: localStorage.getItem('id'),
                first_name: localStorage.getItem('first_name'),
                last_name: localStorage.getItem('last_name'),
                email: localStorage.getItem('email'),

            });
        }

    }, [auth, setUser]) // Déclencher l'effet uniquement si l'authentification, l'utilisateur ou la navigation change


    // Authentifier l'utilisateur
    const login = async (dataLogin) => {
        try {
            // Appeler le service d'authentification
            const response = await loginService(dataLogin)

            // Si la réponse de l'API contient un token JWT
            if (response.token) {
                setAuth(true) // Authentifier l'utilisateur

                // Stocker les informations de l'utilisateur dans le stockage local
                setUser({
                    userId: localStorage.getItem('id'),
                    firstname: localStorage.getItem('first_name'),
                    lastname: localStorage.getItem('last_name'),
                    email: localStorage.getItem('email'),
                });
            }

        } catch (error) {
            console.error('Login failed:', error)
            throw error;
        }
    }

    // Mettre à jour les informations de l'utilisateur
    // const updateUser = async (userData) => {
    //     try {
    //         // Appeler le service de mise à jour de l'utilisateur
    //         const response = await updateUserService(userData)

    //         if (response) {
    //             // Mettre à jour les informations de l'utilisateur dans le stockage local
    //             localStorage.setItem('firstname', userData.firstname)
    //             localStorage.setItem('lastname', userData.lastname)
    //             localStorage.setItem('email', userData.email)

    //             setUser(userData) // Mettre à jour les informations de l'utilisateur
    //         }

    //     } catch (error) {
    //         console.error('Update user failed:', error)
    //         throw error;
    //     }
    // }

    // Mettre à jour la photo de profil de l'utilisateur
    // const updateUserPhoto = async (formData) => {
    //     try {
    //         // Appeler le service de mise à jour de la photo de profil
    //         const response = await updateUserPhotoService(formData)

    //         if (response) {
    //             // Mettre à jour la photo de profil de l'utilisateur dans le stockage local
    //             localStorage.setItem('image', response.user.image)

    //             // Mettre à jour la photo de profil de l'utilisateur
    //             setUser((prevUser) => ({ ...prevUser, image: response.user.image }))
    //         }

    //     } catch (error) {
    //         console.error('Update user photo failed:', error)
    //         throw error
    //     }
    // }

    // Mettre à jour la photo de couverture de l'utilisateur
    // const updateCoverPhoto = async (formData) => {
    //     try {
    //         // Appeler le service de mise à jour de la photo de couverture
    //         const response = await updateCoverPhotoService(formData)

    //         if (response) {
    //             // Mettre à jour la photo de couverture de l'utilisateur dans le stockage local
    //             localStorage.setItem('coverPhoto', response.user.coverPhoto)

    //             // Mettre à jour la photo de couverture de l'utilisateur
    //             setUser((prevUser) => ({ ...prevUser, coverPhoto: response.user.coverPhoto }))
    //         }

    //     } catch (error) {
    //         console.error('Update cover photo failed:', error)
    //         throw error
    //     }
    // }

    // Déconnexion de l'utilisateur
    const logout = async () => {
        try {
            // Appeler le service de déconnexion
            await logoutService()
            removeToken() // Supprimer le token du stockage local
            setAuth(false) // Déconnecter l'utilisateur
            setUser({ first_name: '', last_name: '', email: '', id: '' }) // Réinitialiser les informations de l'utilisateur
            navigate('/login') // Rediriger vers la page de connexion
        } catch (error) {
            console.error('Logout failed:', error)
            throw error
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return {
        isAuthenticated: auth,
        user,
        login,
        logout,
        // updateUser,
        // updateUserPhoto,
        // updateCoverPhoto
    }

}