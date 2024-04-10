import React, { createContext, useContext, useState, ReactNode } from 'react'
import { router } from 'expo-router'
import { setItemAsync, deleteItemAsync } from 'expo-secure-store'
import api from '../../config/axios'

interface IUserLogin {
    email: string
    password: string
}

interface IAuthContext {
    user: IUserLogin
    setUser: (user: IUserLogin) => void
    handleLogin: () => void
    hangleLogout: () => void
}

interface IAuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ email: '', password: '' })

    const handleLogin = () => {
        if (user.email !== '' && user.password !== '') {
            api.post('/login', user)
            .then(response => {
                if (response.status === 200) {
                    setItemAsync('token', response.data.token)
                    router.push('/home')
                }
            })
            .catch(error => {
                alert('Usuário ou senha inválidos')
            })
        } else {
            alert('Usuário ou senha inválidos')
        }
    }

    const hangleLogout = () => {
        deleteItemAsync('token')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, hangleLogout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}