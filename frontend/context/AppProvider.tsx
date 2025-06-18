"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AppProviderType {
  isLoading: Boolean;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Appcontext = createContext<AppProviderType | undefined>(undefined);
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      router.push("auth/login");
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response);
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

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      console.log(response);
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
      value={{ login, register, logout, authToken, isLoading }}
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
