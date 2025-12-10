/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContextData {
  loginService: (
    email: string,
    password: string,
    isRemember: boolean,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  error: string | null;
}

export const AuthContext = createContext<IAuthContextData | undefined>(
  undefined,
);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    setIsLoading(false);
  }, []);

  const loginService = async (
    email: string,
    password: string,
    isRemember: boolean,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      // if (email !== 'admin' || password !== 'admin') {
      //   throw new Error('Credenciais inválidas');
      // }

      const fakeUser: IUser = {
        id: "1",
        name: "Admin",
        email,
      };

      localStorage.setItem("token", "token12");
      localStorage.setItem("user", JSON.stringify(fakeUser));

      setUser(fakeUser);

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const contextValue = useMemo(() => {
    return {
      loginService,
      logout,
      isLoading,
      isAuthenticated: !!user,
      user,
      error,
    };
  }, [isLoading, user, error]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
