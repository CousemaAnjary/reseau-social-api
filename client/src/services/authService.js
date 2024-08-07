import api from './apiConfig'

// Inscrire un nouvel utilisateur
export const register = async (dataRegister) => {
    try {
        // Appel à l'API pour enregistrer un nouvel utilisateur
        const response = await api.post('/register', dataRegister)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
    }
}


// Authentifier un utilisateur
export const login = async (dataLogin) => {
    try {
        // Appel à l'API pour authentifier un utilisateur
        const response = await api.post('/login', dataLogin)

        // Si la réponse de l'API contient un token JWT 
        if (response.data.token) {
            // Stocker le token JWT dans localStorage etc
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('last_name', response.data.user.last_name);
            localStorage.setItem('first_name', response.data.user.first_name);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('image', response.data.user.image);
            localStorage.setItem('image_cover', response.data.user.image_cover);
        }
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error)
    }
}

// Mettre à jour la photo de profil de l'utilisateur
export const updateUserImage = async (dataImage) => {
    try {
        // Appel à l'API pour mettre à jour la photo de profil de l'utilisateur
        const response = await api.post('/updateUserImage', dataImage, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la mise à jour de la photo de profil:', error)
    }
}

// Mettre à jour la photo de couverture de l'utilisateur
export const updateCoverImage = async (dataImageCover) => {
    try {
        // Appel à l'API pour mettre à jour la photo de couverture de l'utilisateur
        const response = await api.post('/updateCoverImage', dataImageCover, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la mise à jour de la photo de couverture:', error)
    }
};

// Déconnecter un utilisateur
export const logout = async () => {
    try {
        await api.post('/logout');
        // Supprimer les données utilisateur du stockage local
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('first_name')
        localStorage.removeItem('last_name')
        localStorage.removeItem('email')
        localStorage.removeItem('image')
        localStorage.removeItem('image_cover')

    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
    }
}