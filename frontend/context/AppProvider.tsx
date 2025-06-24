"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_picture?: string | null;
}
interface AuthResponse {
    user: User;
    status: boolean;
    token: string;
    message: string;
    role: string;
}

interface AppProviderType {
    isLoading: Boolean;
    user: User | null;
    authToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        role: string
    ) => Promise<void>;
    logout: () => void;
}

const Appcontext = createContext<AppProviderType | undefined>(undefined);
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = Cookies.get("authToken");
            if (token) {
                try {
                    setIsLoading(true);
                    // Verify token and fetch user data
                    const response = await axios.get(`${API_URL}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);
                    setAuthToken(token);
                } catch (error) {
                    console.error("Auth verification failed:", error);
                    logout();
                } finally {
                    setIsLoading(false);
                }
            } else {
                router.push("/auth/login");
            }
        };

        initializeAuth();
    }, [router]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            console.log(response.data);
            setUser(response.data.user);

            if (response.data.status) {
                Cookies.set("authToken", response.data.token, { expires: 7 });
                setAuthToken(response.data.token);
                router.push("/userDashboard");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        role: string
    ) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
                role,
            });
            console.log(response);
            setUser(response.data);
            if (response.data.status) {
                Cookies.set("authToken", response.data.token, { expires: 7 });
                setAuthToken(response.data.token);
                router.push("/dashboard");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setAuthToken(null);
        Cookies.remove("authToken");
        setIsLoading(false);
        router.push("/auth/login");
    };

    return (
        <Appcontext.Provider
            value={{ login, register, logout, authToken, isLoading, user }}
        >
            {children}
        </Appcontext.Provider>
    );
};

export const AppHook = () => {
    const context = useContext(Appcontext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider ");
    } else {
        return context;
    }
};
